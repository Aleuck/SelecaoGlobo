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
import { Add, Edit, BarChart } from '@material-ui/icons';

import EditWallDialog from '../edit-wall-dialog';
import ViewWallDialog from '../view-wall';

const styles = theme => ({
  fab: {
    position: 'relative',
    marginTop: theme.spacing(-3),
    top: theme.spacing(3),
  },
});

class WallsList extends React.Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    season: PropTypes.object.isRequired,
    wall: PropTypes.object,
  }

  static initialState = {
    walls: null,
    error: null,
    status: 'loading',
    viewWallOpen: false,
    viewWall: null,
    editWallOpen: false,
    editWall: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...WallsList.initialState
    };
  }

  componentDidMount() {
    this.init();
    this.fetchInitialData();
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  componentDidUpdate(prevProps) {
    if (this.props.client !== prevProps.client) {
      this.removeListeners()
      this.setState({
        ...WallsList.initialState
      });
      this.init();
      this.fetchInitialData();
    }
    if (this.props.season !== prevProps.season) {
      this.setState({
        ...WallsList.initialState
      });
      this.fetchInitialData();
    }
  }

  init() {
    this.service = this.props.client.service('walls');
    this.service.on('created', this.handleWallCreated);
    this.service.on('updated', this.handleWallUpdated);
    this.service.on('removed', this.handleWallRemoved);
  }

  removeListeners() {
    this.service.removeAllListeners('created');
    this.service.removeAllListeners('updated');
    this.service.removeAllListeners('removed');
  }

  fetchInitialData() {
    this.service.find({ seasonId: this.props.season.id })
      .then(walls => {
        this.setState({
          walls: this.sortWalls(walls),
          status: 'loaded',
          error: null,
        });
      })
      .catch(reason => {
        this.setState({
          walls: null,
          status: 'error',
          error: reason,
        });
      });
  }

  sortWalls = walls => walls.sort((a, b) => 0);

  handleWallCreated = wall => {
    if (wall.seasonId === this.props.season.id) {
      this.setState({
        walls: this.sortWalls([...this.state.walls, wall]),
      });
    }
  };

  handleWallUpdated = wall => {
    if (wall.seasonId === this.props.season.id) {
      this.setState({
        walls: this.sortWalls(
          this.state.walls.map(w => {
            if (w.id === wall.id) {
              return wall;
            } else {
              return w;
            }
          })
        ),
      });
    }
  }

  handleWallRemoved = wall => {
    console.log('removed', wall);
  }

  openViewWall = wall => () => {
    this.setState({
      viewWallOpen: true,
      viewWall: wall || null,
    });
  }

  closeViewWall = () => {
    this.setState({
      viewWallOpen: false,
      viewWall: null,
    });
  }

  openEditWall = wall => () => {
    this.setState({
      editWallOpen: true,
      editWall: wall || null,
    });
  }

  closeEditWall = () => {
    this.setState({
      editWallOpen: false,
      editWall: null,
    });
  }

  handleWallSubmit = wall => {
    if (wall.id) {
      this.service.update(wall.id, wall);
    } else {
      this.service.create({
        title: wall.title,
        startsAt: wall.startsAt,
        endsAt: wall.endsAt,
        seasonId: wall.seasonId,
      });
    }
    this.closeEditWall();
  }

  renderListItem = wall => (
    <ListItem key={wall.id}>
      <ListItemText>
        {wall.title}
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Visualizar" onClick={this.openViewWall(wall)}>
          <BarChart />
        </IconButton>
        <IconButton edge="end" aria-label="Editar" onClick={this.openEditWall(wall)}>
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
        <Typography variant="h6">Paredões</Typography>
        {this.state.status === 'loading' && (
          <CircularProgress />
        )}
        {this.state.status === 'loaded' && (
          <List>
            {this.state.walls.map(this.renderListItem)}
          </List>
        )}
        <EditWallDialog
          client={this.props.client}
          seasonId={this.props.season.id}
          wall={this.state.editWall}
          open={this.state.editWallOpen}
          onClose={this.closeEditWall}
          onSubmit={this.handleWallSubmit}
        />
        <ViewWallDialog
          client={this.props.client}
          wall={this.state.viewWall}
          open={this.state.viewWallOpen}
          onClose={this.closeViewWall}
        />
        <Fab
          aria-label="Adicionar pardão"
          onClick={this.openEditWall(null)}
          color="primary"
          className={classes.fab}
          size="medium"
        >
          <Add />
        </Fab>
      </Paper>
    );
  }
}

export default withStyles(styles)(WallsList);
