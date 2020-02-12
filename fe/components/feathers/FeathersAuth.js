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
      errorMessage: null,
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
        errorMessage: reason.message,
      });
    });
  };

  logoutHandler = () => {
    this.props.client.logout();
    this.setState({
      authState: AUTH_STATES.unauthenticated,
      user: null,
    });
  }

  render() {
    if (this.state.authState === AUTH_STATES.authenticated) {
      return this.props.children({
        logout: this.logoutHandler,
        user: this.state.user,
      });
    }
    else {
      return this.props.renderLogin({
        onSubmit: this.loginSubmitHandler,
        errorMessage: this.state.errorMessage,
        disabled: this.state.authState === AUTH_STATES.checking,
      });
    }
  }
}

export default FeathersAuth;
