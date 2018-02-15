import React from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../api/auth-api';
import {userIsRegistering, userRegistrationSuccess, userRegistrationFailure} from '../redux/actions';
import { Redirect } from 'react-router-dom';

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: '',
    password: '',
    email: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(userIsRegistering());

    try {
      const response = await registerUser(
        this.state.username,
        this.state.password,
        this.state.email
      );

      // save user details in localStorage
      window.localStorage.setItem('token', response.token);
      window.localStorage.setItem('uid', response.uid);
      window.localStorage.setItem('username', response.username);

      this.props.dispatch(userRegistrationSuccess(response.user, response.token));
    }
    catch (error) {
      console.log(error);
      this.props.dispatch(userRegistrationFailure(error.toString()));
    }
  }

  render() {

    if (this.props.userIsAuthed) {
      return (
        <Redirect to={{
          pathname: '/',
          state: { from: this.props.location } 
        }} />
      )
    }
    else {
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
            <label htmlFor='email'>email (optional):</label>
            <input
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.handleChange} />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    userIsAuthed: state.user.authed
  }
}

export default connect(mapStateToProps)(Register)