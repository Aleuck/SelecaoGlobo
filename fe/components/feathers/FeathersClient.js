import React from 'react';
import PropTypes from 'prop-types';

import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

class FeathersClient extends React.Component {
  static propTypes = {
    server: PropTypes.string.isRequired,
    loadingComponent: PropTypes.node,
    children: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    }
  }

  componentDidMount() {
    this.socket = io(this.props.server);
    this.client = feathers();
    this.client.configure(socketio(this.socket));
    this.setState({
      initialized: true,
    });
  }

  render() {
    return (this.state.initialized ? this.props.children(this.client) : this.props.loadingComponent || "loading");
  }
}

export default FeathersClient;
