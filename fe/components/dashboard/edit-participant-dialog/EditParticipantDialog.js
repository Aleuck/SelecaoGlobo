import React, { useCallback } from 'react';
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
  Typography,
} from '@material-ui/core';
import Dropzone, { useDropzone } from 'react-dropzone';
import jQuery from 'jquery';

class ImageDropzone extends React.Component {
  static contextType = ThemeContext;



  render() {
    return (
      <Dropzone
        accept="image/*"
        maxSize={256000}
        multiple={false}
        onDropAccepted={this.props.onDropAccepted}
        onDropRejected={this.onDropRejected}
      >
        {({getRootProps, getInputProps}) => (
          <div
            {...getRootProps()}
            className={this.context.selectableParticipant.participant__imgPlaceholder}
            style={this.props.preview && {
              backgroundImage: `url(${this.props.preview})`,
            }}
          >
            {!this.props.preview && 'Clique ou arraste uma imagem aqui'}
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    );
  }
}
class EditParticipantDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image: {},
    };
  }

  handleImageDropAccepted = ([file]) => {
    console.log('onDrop!!!');
    console.log(file);
    const data = new FormData();
    data.append('uri', file);
    this.props.client.get('authentication')
      .then(({ accessToken }) => {
        jQuery.ajax({
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          url: `${process.env.SERVER_URL}/images`,
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          method: 'POST',
          type: 'POST', // For jQuery < 1.9
          success: this.handleImageSendComplete,
        });
      });
  }

  handleImageDropRejected = (reason) => {
    console.log('drop rejected', reason);
  }

  handleImageSendComplete = data => {
    this.setState({
      image: data,
    });
  }

  handleInputChange = propName => event => {
    this.setState({
      [propName]: event.target.value,
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
        <DialogTitle id="dialog-create-season-title">
          {this.props.seasonId ? 'Editar participante' : 'Adicionar participante' }
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                onChange={this.handleInputChange('title')}
                value={this.state.title}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Foto</Typography>
              <ImageDropzone
                onDropAccepted={this.handleImageDropAccepted}
                onDropRejected={this.handleImageDropRejected}
                preview={this.state.image.uri}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button color="secondary" onClick={this.handleSubmit}>Salvar</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default EditParticipantDialog;
