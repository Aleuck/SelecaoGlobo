import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../layouts/default';
import TextInput from '../text-input';
import Button from '../button';

class Login extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    username: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username || '',
      password: '',
    }
  }

  inputChangeHandler = field => event => {
    console.log(field, event.target.value);
    this.setState({
      [field]: event.target.value,
    });
  }

  loginSubmitHandler = event => {
    event.preventDefault();
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit({
        username: this.state.username,
        password: this.state.password,
      });
    }
  };

  render() {
    return (
      <Layout>
        <form onSubmit={this.loginSubmitHandler}>
          <TextInput
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.inputChangeHandler('username')}
            type="text"
          />
          <TextInput
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.inputChangeHandler('password')}
            type="password"
          />
          <Button type="submit">
            Login
          </Button>
        </form>
      </Layout>
    );
  }
}

export default Login;
