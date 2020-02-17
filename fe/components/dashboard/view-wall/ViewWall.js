/* globals FormData */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  CircularProgress,
  Container,
} from '@material-ui/core';

class EditWallDialog extends React.Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    wall: PropTypes.number,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
    };
  }

  render() {
    const {
      open,
      onClose,
      wall,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
      >
        {this.state.status === 'loading' && (
          <DialogContent style={{ textAlign: 'center' }}>
            <CircularProgress />

            <p>Não tive tempo de terminar :(</p>
          </DialogContent>
        )}
        {this.state.status === 'loaded' && (
          <Fragment>
            <DialogTitle id="dialog-create-wall-title">
              {wall.title}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {wall.startsAt}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {wall.endsAt}
                </Grid>
              </Grid>
            </DialogContent>
          </Fragment>
        )}
      </Dialog>
    );
  }
}

export default EditWallDialog;
