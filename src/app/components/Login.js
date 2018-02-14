import React from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../api/auth-api';

import { userIsAuthing, userAuthSuccess, userAuthFailure } from '../redux/actions';

import './Login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(userIsAuthing());

    try {
      const response = await loginUser(this.state.username, this.state.password);
      // store token in localstorage
      window.localStorage.setItem('token', response.token);
      window.localStorage.setItem('uid', response.uid);
      window.localStorage.setItem('username', response.username);
      this.props.dispatch(userAuthSuccess(response.uid, response.username, response.token));
    }
    catch (error) {
      console.log(error.toString());
      this.props.dispatch(userAuthFailure(error.toString()));
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='username'>username:</label>
          <input
            type='text'
            name='username'
            value={this.state.username}
            onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor='password'>password:</label>
          <input
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange} />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    )
  }
}

export default connect()(Login)