import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/default';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  Fab,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Add } from '@material-ui/icons';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import EditSeasoDialog from './edit-season-dialog';
import EditParticipantDialog from './edit-participant-dialog';

const styles = theme => ({
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: grey[200],
    maxHeight: 'min-content',
    minHeight: 'min-content',
  },
  seasonTabPanel: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'stretch',
    minHeight: 'min-content',
  },
  createSeasonPanel: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'min-content',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(4),
  },
  seasonTitle: {
    flexGrow: '1',
    fontWeight: '700'
  },
  seasonTabs: {
    flexGrow: '1',
  },
  seasonTabTabPanel: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'stretch',
    minHeight: 'min-content',
  },
});

const createTabPanelComponent = identifier => {
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <Fragment>
        {value === index && (
          <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`${identifier}-tabpanel-${index}`}
            aria-labelledby={`${identifier}-tab-${index}`}
            {...other}
          >
            {children}
          </Typography>
        )}
      </Fragment>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  return TabPanel;
};

const SeasonTabPanel = createTabPanelComponent('season');
const SeasonTabTabPanel = createTabPanelComponent('season-tab');

function a11yProps(index) {
  return {
    id: `season-tab-${index}`,
    'aria-controls': `season-tabpanel-${index}`,
  };
}

const CreateSeasonTab = withStyles(theme => ({
  root: {
    color: theme.palette.secondary.light,
    '&$selected&$textColorPrimary': {
      color: theme.palette.secondary.main,
    },
  },
  // for some reason the combined class selector above
  // only works if i define the classes separatedly as well
  textColorPrimary: {
    color: theme.palette.secondary.light,
  },
  selected: {
    color: theme.palette.secondary.main,
  },
}))(props => <Tab disableRipple {...props} />);

class Dashboard extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    client: PropTypes.object.isRequired,
    logout: PropTypes.func,
    classes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      openEditParticipant: false,
      seasons: [],
      currentTab: 0,
      selectedSeason: -1,
    };
  }

  componentDidMount() {
    this.client = this.props.client;
    this.seasonsService = this.client.service('seasons');
    this.seasonsService.on('created', this.handleMessageSeasonCreated);
    this.participantsService = this.client.service('participants');
    this.participantsService.on('created', this.handleMessageSeasonCreated);
    this.seasonsService.find()
      .then(response => {
        this.setState({
          seasons: [...response],
          selectedSeason: response.length - 1,
          currentTab: response.length,
        });
      })
      .catch(reason => {
        console.log('find failed', reason);
      });
  }

  componentWillUnmount() {
    this.seasonsService.removeAllListeners('created');
  }

  handleMessageSeasonCreated = season => {
    console.log('SeasonCreated', season);
    this.setState({
      seasons: [...this.state.seasons, season],
      selectedSeason: this.state.seasons.length,
      currentTab: this.state.seasons.length + 1,
    });
  };

  handleMessageParticipantCreated = participant => {
    console.log('ParticipantCreated', participant);
    const currentSeasonIdx = this.state.selectedSeason - 1;
    if (this.state.seasons[currentSeasonIdx]) {
      this.setState({
        participants: [...this.state.participants, participant],
        currentTab: this.state.seasons.length + 1,
      });
    }
  };

  handleCreateParticipantClose = () => {
    this.setState({ openEditParticipant: false });
  };

  handleCreateParticipantOpen = () => {
    this.setState({ openEditParticipant: true });
  };

  handleCreateSeasonSubmit = seasonData => {
    return this.seasonsService.create(seasonData);
  };

  handleCreateParticipantSubmit = participantData => {
    return this.participantsService.create(participantData)
      .then(() => {
        this.setState({ openEditParticipant: false });
      });
  };

  handleTabChange = (event, newValue) => {
    console.log(newValue);
    if (newValue > 0 && newValue <= this.state.seasons.length) {
      this.setState({
        selectedSeason: newValue - 1,
        currentTab: newValue,
      });
    } else {
      this.setState({
        selectedSeason: -1,
        currentTab: newValue,
      });
    }
  }

  render() {
    const {
      classes,
      logout,
    } = this.props;
    const {
      openEditParticipant,
      selectedSeason,
      seasons,
      currentTab,
    } = this.state;

    return (
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Layout
          header={(
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Paredão BBB
                </Typography>
                <Button color="inherit" onClick={logout}>Logout</Button>
              </Toolbar>
            </AppBar>
          )}
          fullHeight
          flexRow
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={currentTab}
            className={classes.tabs}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTabChange}
          >
            <Tab label="Temporadas" disabled />
            {seasons.map((season, index) => (
              <Tab
                label={season.title}
                id={`season-tab-${season.id}`}
                key={`season-tab-${season.id}`}
                {...a11yProps(index)}
              />
            ))}
            <CreateSeasonTab
              label={'Criar nova'}
              id={'create-season-tab'}
            />
          </Tabs>

          {seasons.map((season, index) => (
            <SeasonTabPanel
              index={index}
              value={selectedSeason}
              id={`season-tab-${season.id}`}
              key={`season-tabpanel-${season.id}`}
              className={classes.seasonTabPanel}
            >
              <AppBar
                position="static"
                variant="outlined"
                color="default"
              >
                <Toolbar variant="dense">
                  <Typography className={classes.seasonTitle}>Temporada {season.title}</Typography>
                  <Tabs
                    variant="scrollable"
                    orientation="horizontal"
                    className={classes.seasonTabs}
                    value={1}
                  >
                    <Tab
                      label="Participantes"
                    />
                    <Tab
                      label="Paredões"
                    />
                  </Tabs>
                </Toolbar>
              </AppBar>
              <SeasonTabTabPanel
                index={0}
                value={1}
                className={classes.seasonTabTabPanel}
              >
                a
              </SeasonTabTabPanel>
              <SeasonTabTabPanel
                index={1}
                value={1}
                className={classes.seasonTabTabPanel}
              >
                b
              </SeasonTabTabPanel>
              <Fab
                color="primary"
                aria-label="Adicionar temporada"
                size="small"
                className={classes.fab}
                onClick={this.handleCreateParticipantOpen}
              >
                <Add />
              </Fab>
            </SeasonTabPanel>
          ))}
          <SeasonTabPanel
            index={seasons.length + 1}
            value={currentTab}
            id={'create-season-tab'}
            className={classes.createSeasonPanel}
          >
            <EditSeasoDialog
              onSubmit={this.handleCreateSeasonSubmit}
            />
          </SeasonTabPanel>
          <EditParticipantDialog
            open={openEditParticipant}
            onClose={this.handleCreateParticipantClose}
            onSubmit={this.handleCreateParticipantSubmit}
            client={this.client}
            season={selectedSeason >= 0 ? seasons[selectedSeason].id : -1}
          />
        </Layout>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(Dashboard);
