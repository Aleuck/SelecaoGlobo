/* globals FormData */
import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../themes/ThemeContext';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
} from '@material-ui/core';

import { DatePicker } from '@material-ui/pickers';

class EditWallDialog extends React.Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    seasonId: PropTypes.number,
    wall: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: '',
    };
  }

  init = () => {
    const wall = this.props.wall;
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    this.setState({
      id: wall ? wall.id : null,
      title: wall ? wall.title : '',
      startsAt: wall ? wall.startsAt : today,
      endsAt: wall ? wall.endsAt : tomorrow,

    });
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.open && this.props.open) {
      this.init();
    }
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

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.id,
      title: this.state.title,
      startsAt: this.state.startsAt,
      endsAt: this.state.endsAt,
      seasonId: this.props.seasonId,
    });
  }

  render() {
    const {
      open,
      onClose,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-create-wall-title">
          {this.props.wall ? 'Editar paredão' : 'Adicionar paredão'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                onChange={this.handleInputChange('title')}
                value={this.state.title}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                format="dd/MM/yyyy"
                id="seasonStartsAtPicker"
                label="Início do paredão"
                value={this.state.startsAt}
                onChange={this.handleDateChange('startsAt')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                format="dd/MM/yyyy"
                id="seasonEndsAtPicker"
                label="Final do paredão"
                value={this.state.endsAt}
                onChange={this.handleDateChange('endsAt')}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button color="secondary" onClick={this.handleSubmit}>Salvar</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditWallDialog;
