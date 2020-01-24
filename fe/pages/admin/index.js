import React from 'react';

import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

import '../../themes/base-css';
import Layout from '../../components/layouts/default';
import Button from '../../components/button';
import TextInput from '../../components/text-input';

const AUTH_STATES = {
  unauthenticated: 'unauthenticated',
  checking: 'checking',
  authenticated: 'authenticated',
};

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authState: AUTH_STATES.checking,
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.socket = io('http://localhost:3030');
    this.client = feathers();
    this.client.configure(socketio(this.socket));
    this.client.configure(auth({
      storageKey: 'auth',
    }));

    this.client.reAuthenticate()
      .then(something => {
        // User is authenticated
        console.log('reAuthenticate success', something);
        this.setState({
          authState: AUTH_STATES.authenticated,
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

  inputChangeHandler = field => event => {
    console.log(field, event.target.value);
    this.setState({
      [field]: event.target.value,
    });
  }

  loginSubmitHandler = event => {
    event.preventDefault();
    this.setState({
      authState: AUTH_STATES.checking,
    });
    this.client.authenticate({
      'strategy': 'local',
      'username': this.state.username,
      'password': this.state.password,
    }).then(result => {
      console.log('authentication success', result);
      this.setState({
        authState: AUTH_STATES.authenticated,
        password: '',
      });
    }).catch(reason => {
      console.log('authentication failed', reason);
      this.setState({
        authState: AUTH_STATES.unauthenticated,
        password: '',
      });
    })
  };

  logoutHandler = () => {
    this.client.logout();
    this.setState({
      authState: AUTH_STATES.unauthenticated,
    });
  }

  render () {
    return (
      <Layout pageTitle="Paredão BBB - Dashboard">
        {this.state.authState}
        <form onSubmit={this.loginSubmitHandler}>
          <TextInput
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.inputChangeHandler('username')}
            type="text"
            disabled={this.state.authState !== AUTH_STATES.unauthenticated}
          />
          <TextInput
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.inputChangeHandler('password')}
            type="password"
            disabled={this.state.authState !== AUTH_STATES.unauthenticated}
          />
          <Button
            disabled={this.state.authState !== AUTH_STATES.unauthenticated}
          >
            Login
          </Button>
        </form>
        <Button onClick={this.logoutHandler}>Logout</Button>
      </Layout>
    );
  }
}
export default Admin;
