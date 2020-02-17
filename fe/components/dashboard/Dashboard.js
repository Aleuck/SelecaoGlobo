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
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import EditSeasoDialog from './edit-season-dialog';
import SeasonView from './season-view';

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
          seasons: this.sortSeasons([...response]),
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

  sortSeasons = seasons => seasons.sort((a, b) => {
    return (new Date(a.startsAt) - new Date(b.startsAt));
  });

  handleMessageSeasonCreated = season => {
    this.setState({
      seasons: this.sortSeasons([...this.state.seasons, season]),
      selectedSeason: this.state.seasons.length,
      currentTab: this.state.seasons.length + 1,
    });
  };

  handleCreateSeasonSubmit = seasonData => {
    return this.seasonsService.create(seasonData);
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
              <SeasonView client={this.client} season={season} />
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
        </Layout>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(Dashboard);
