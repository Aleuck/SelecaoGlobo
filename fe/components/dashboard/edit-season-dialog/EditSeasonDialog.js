import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
} from '@material-ui/core';

import { DatePicker } from '@material-ui/pickers';

class EditSeasonDialog extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    seasonId: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      startsAt: new Date(),
      endsAt: new Date(),
    };
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
      id: this.props.seasonId,
      title: this.state.title,
      startsAt: this.state.startsAt,
      endsAt: this.state.endsAt,
    });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5">
          {this.props.seasonId ? 'Editar Temporada' : 'Nova temporada'}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} >
            <TextField
              label="Título da temporada"
              onChange={this.handleInputChange('title')}
              value={this.state.title}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              format="dd/MM/yyyy"
              id="seasonStartsAtPicker"
              label="Início da temporada"
              value={this.state.startsAt}
              onChange={this.handleDateChange('startsAt')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              format="dd/MM/yyyy"
              id="seasonEndsAtPicker"
              label="Final da temporada"
              value={this.state.endsAt}
              onChange={this.handleDateChange('endsAt')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" variant="contained" onClick={this.handleSubmit}>Salvar</Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default EditSeasonDialog;
