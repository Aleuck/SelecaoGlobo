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
      id: null,
      title: '',
      status: 'loading',
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
