import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/default';
import { AppBar, Toolbar, Button, Typography, Tabs, Tab, Box, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Add } from '@material-ui/icons';
import LuxonUtils from '@date-io/luxon'
import {
  MuiPickersUtilsProvider, DatePicker
} from '@material-ui/pickers';
const styles = theme => ({
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: grey[200],
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



class Dashboard extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    client: PropTypes.object.isRequired,
    logout: PropTypes.func,
    selectedSeason: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      seasonTitle: '',
      seasonStartDate: new Date(),
      seasonEndDate: new Date(),
    };
  }

  componentDidMount() {
    this.client = this.props.client;
    this.seasonsService = this.client.service('seasons');
    this.seasonsService.on('created', this.handleMessageSeasonCreated);
  }

  componentWillUnmount() {
    this.seasonsService.removeAllListeners('created');
  }

  handleMessageSeasonCreated = message => {
    console.log(message);
  }

  handleCreateSeasonClose = () => {
    this.setState({ openCreateSeason: false });
  };

  handleCreateSeasonOpen = () => {
    this.setState({ openCreateSeason: true });
  }

  createSeason = () => {
    this.seasonsService.create({
      title: this.state.seasonTitle,
      startsAt: this.state.seasonStartDate,
      endsAt: this.state.seasonEndDate,
    });
  }

  handleInputChange = propName => event => {
    this.setState({
      [propName]: event.target.value,
    });
  }

  handleDateChange = propName => date => {
    this.setState({
      [propName]: date,
    });
  }

  render() {
    const {
      classes,
      logout,
    } = this.props;
    const {
      openCreateSeason
    } = this.state;
    return (
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Layout
          header={(
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Paredão BBB - Dashboard
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
            value={"tab-1"}
            className={classes.tabs}
          >
            <Tab label="1&ordf; Temporada" id="tab-1" />
            <Tab label="2&ordf; Temporada" id="tab-2" />
            <Tab label="3&ordf; Temporada" id="tab-3" />
            <Tab label="4&ordf; Temporada" id="tab-4" />
          </Tabs>
          <TabPanel></TabPanel>
          <Fab

            color="primary"
            aria-label="Adicionar temporada"
            size="small"
            className={classes.fab}
            onClick={this.handleCreateSeasonOpen}
          >
            <Add />
          </Fab>
          <Dialog
            open={openCreateSeason}
            onClose={this.handleCreateSeasonClose}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle id="dialog-create-season-title">Adicionar Temporada</DialogTitle>
            <DialogContent>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Título da temporada"
                    onChange={this.handleInputChange('seasonTitle')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DatePicker
                    format="dd/MM/yyyy"
                    id="seasonStartDatePicker"
                    label="Início da temporada"
                    onChange={this.handleDateChange('seasonStartDate')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DatePicker
                    format="dd/MM/yyyy"
                    id="seasonEndDatePicker"
                    label="Final da temporada"
                    onChange={this.handleDateChange('seasonEndDate')}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button>Cancelar</Button>
              <Button color="secondary" onClick={this.createSeason}>Adicionar</Button>
            </DialogActions>
          </Dialog>
        </Layout>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(Dashboard);
