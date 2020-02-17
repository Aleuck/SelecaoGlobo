import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  CircularProgress,
  Typography,
  Fab,
  List,
  ListItem,
  withStyles,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';

import EditParticipantDialog from '../edit-participant-dialog';

const styles = theme => ({
  fab: {
    position: 'relative',
    marginTop: theme.spacing(-3),
    top: theme.spacing(3),
  },
});

class ParticipantsList extends React.Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    season: PropTypes.object.isRequired,
  }

  static initialState = {
    participants: null,
    error: null,
    status: 'loading',
    editDialogOpen: false,
    editParticipant: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...ParticipantsList.initialState
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.service.removeAllListeners('created');
    this.service.removeAllListeners('updated');
  }

  componentDidUpdate(prevProps) {
    if (this.props.client !== prevProps.client) {
      this.setState({
        ...ParticipantsList.initialState
      });
      this.service.removeAllListeners('created');
      this.service.removeAllListeners('updated');
      this.init();
    }
    if (this.props.season !== prevProps.season) {
      this.setState({
        ...ParticipantsList.initialState
      });
    }
  }

  init() {
    this.service = this.props.client.service('participants');
    this.service.on('created', this.handleParticipantCreated);
    this.service.on('updated', this.handleParticipantUpdated);
    this.service.find({ seasonId: this.props.season.id })
      .then(participants => {
        this.setState({
          participants: this.sortParticipants(participants),
          status: 'loaded',
          error: null,
        });
      })
      .catch(reason => {
        this.setState({
          participants: null,
          status: 'error',
          error: reason,
        });
      });
  }

  sortParticipants = participants => participants.sort((a, b) => 0);

  handleParticipantCreated = participant =>  {
    if (participant.seasonId === this.props.season.id) {
      this.setState({
        participants: this.sortParticipants([...this.state.participants, participant]),
      });
    }
  };

  handleParticipantUpdated = participant => {
    if (participant.seasonId === this.props.season.id) {
      this.setState({
        participants: this.sortParticipants(
          this.state.participants.map(p => {
            if (p.id === participant.id) {
              return participant;
            } else {
              return p;
            }
          })
        ),
      });
    }
  }

  openEditParticipant = participant => () => {
    this.setState({
      editDialogOpen: true,
      editParticipant: participant || null,
    });
  }

  closeEditParticipant = () => {
    this.setState({
      editDialogOpen: false,
      editParticipant: null,
    });
  }

  handleParticipantSubmit = participant => {
    if (participant.id) {
      this.service.update(participant.id, participant);
    } else {
      this.service.create({
        name: participant.name,
        image: participant.image,
        seasonId: participant.seasonId,
      });
    }
    this.closeEditParticipant();
  }

  renderListItem = participant => (
    <ListItem key={participant.id}>
      <ListItemText>
        {participant.name}
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="Editar" onClick={this.openEditParticipant(participant)}>
          <Edit />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

  render() {
    const {
      classes,
    } = this.props;
    return (
      <Paper>
        <Typography variant="h6">Participantes</Typography>
        {this.state.status === 'loading' && (
          <CircularProgress />
        )}
        {this.state.status === 'loaded' && (
          <List>
            {this.state.participants.map(this.renderListItem)}
          </List>
        )}
        <EditParticipantDialog
          client={this.props.client}
          seasonId={this.props.season.id}
          participant={this.state.editParticipant}
          open={this.state.editDialogOpen}
          onClose={this.closeEditParticipant}
          onSubmit={this.handleParticipantSubmit}
        />
        <Fab aria-label="Adicionar participante" onClick={this.openEditParticipant(null)} color="primary" className={classes.fab} size="medium"><Add /></Fab>
      </Paper>
    );
  }
}

export default withStyles(styles)(ParticipantsList);
