import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../layouts/default';

import {
  TextField,
  Button,
  Card,
  CardContent,
  Container,
  CardHeader,
} from '@material-ui/core';

import {
  withStyles,
} from '@material-ui/core/styles'

import Alert from '@material-ui/lab/Alert';

const styles = theme => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
});

class Login extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    errorMessage: PropTypes.string,
    disabled: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    // if (props.failedInfo) {
    //   this.state.username = props.failedInfo.username;
    // }
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
      this.setState({
        password: '',
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Container maxWidth="xs">
          <Card style={{textAlign:"left"}}>
            {this.props.errorMessage ? (<Alert severity="error">{this.props.errorMessage}</Alert>) : null}
            <CardHeader title="Paredão BBB" subheader="Dashboard login" />
            <CardContent>
              <form onSubmit={this.loginSubmitHandler}>
                <TextField
                  id="username"
                  color="primary"
                  label="Username"
                  value={this.state.username}
                  onChange={this.inputChangeHandler('username')}
                  disabled={this.props.disabled}
                  className={classes.textField}
                  required
                  fullWidth
                />
                <TextField
                  id="password"
                  color="primary"
                  label="Password"
                  value={this.state.password}
                  onChange={this.inputChangeHandler('password')}
                  disabled={this.props.disabled}
                  className={classes.textField}
                  type="password"
                  required
                  fullWidth
                />
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={this.props.disabled}
                  onClick={this.loginSubmitHandler}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Layout>
    );
  }
}

export default withStyles(styles)(Login);
