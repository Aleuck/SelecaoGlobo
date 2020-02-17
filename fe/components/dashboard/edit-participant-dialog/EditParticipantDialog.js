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
  Typography,
} from '@material-ui/core';
import Dropzone from 'react-dropzone';
import jQuery from 'jquery';

class ImageDropzone extends React.Component {
  static contextType = ThemeContext;
  static propTypes = {
    client: PropTypes.object.isRequired,
    onDropAccepted: PropTypes.func,
    preview: PropTypes.string,
  };


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
            style={this.props.preview ? {
              backgroundImage: `url(${this.props.preview})`,
            } : null}
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
  static propTypes = {
    client: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    seasonId: PropTypes.number,
    participant: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name:  '',
      image: null,
      imageData: null,
    };
  }

  init = () => {
    const participant = this.props.participant;
    this.setState({
      id: participant ? participant.id : null,
      name: participant ? participant.name : '',
      image: participant ? participant.image : null,
      imageData: null,
    });
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.open && this.props.open) {
      this.init();
    }
    if (this.state.image && !this.state.imageData) {
      this.fetchImage();
    }
  }

  fetchImage = () => {
      fetch(`${process.env.API_URL}/images/${this.state.image}`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            imageData: data,
            image: data.id,
          });
        })
  }

  handleImageDropAccepted = ([file]) => {
    const data = new FormData();
    data.append('uri', file);
    this.props.client.get('authentication')
      .then(({ accessToken }) => {
        jQuery.ajax({
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          url: `${process.env.API_URL}/images`,
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
      imageData: data,
      image: data.id,
    });
  }

  handleInputChange = propName => event => {
    this.setState({
      [propName]: event.target.value,
    });
  }

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.id,
      name: this.state.name,
      image: this.state.image,
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
        <DialogTitle id="dialog-create-participante-title">
          {this.props.participant ? 'Editar participante' : 'Adicionar participante' }
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                onChange={this.handleInputChange('name')}
                value={this.state.name}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Foto</Typography>
              <ImageDropzone
                client={this.props.client}
                onDropAccepted={this.handleImageDropAccepted}
                onDropRejected={this.handleImageDropRejected}
                preview={this.state.imageData && this.state.imageData.uri}
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

export default EditParticipantDialog;
