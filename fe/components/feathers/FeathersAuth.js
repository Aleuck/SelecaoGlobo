import React from 'react';
import PropTypes from 'prop-types';

import auth from '@feathersjs/authentication-client';

const AUTH_STATES = {
  unauthenticated: 'unauthenticated',
  checking: 'checking',
  authenticated: 'authenticated',
};

class FeathersAuth extends React.Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    loadingScreen: PropTypes.element,
    renderLogin: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      authState: AUTH_STATES.checking,
      user: null,
    };
    this.client = props.client;
  }

  componentDidMount() {
    this.props.client.configure(auth({
      storageKey: 'auth',
    }));

    this.props.client.reAuthenticate()
      .then(result => {
        // User is authenticated
        this.setState({
          authState: AUTH_STATES.authenticated,
          user: { ...result.user },
        });
      })
      .catch(reason => {
        // User is not authenticated
        console.log('reAuthenticate fail', reason);
        this.setState({
          authState: AUTH_STATES.unauthenticated,
        });
      });
  }

  loginSubmitHandler = loginData => {
    this.setState({
      authState: AUTH_STATES.checking,
    });
    this.props.client.authenticate({
      'strategy': 'local',
      ...loginData,
    }).then(result => {
      console.log('authentication success', result);
      this.setState({
        authState: AUTH_STATES.authenticated,
        user: { ...result.user },
      });
    }).catch(reason => {
      console.log('authentication failed', reason);
      this.setState({
        authState: AUTH_STATES.unauthenticated,
      });
    })
  };

  logoutHandler = () => {
    this.props.client.logout();
    this.setState({
      authState: AUTH_STATES.unauthenticated,
      user: null,
    });
  }

  render() {
    if (this.state.authState === AUTH_STATES.checking) {
      return this.props.loadingScreen || 'loading';
    }
    else if (this.state.authState === AUTH_STATES.unauthenticated) {
      return this.props.renderLogin(this.loginSubmitHandler);
    }
    else if (this.state.authState === AUTH_STATES.authenticated) {
      return this.props.children(this.logoutHandler, this.state.user);
    }
    else {
      return "invalid authState";
    }
  }
}

export default FeathersAuth;
