import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../api/auth-api';
import { userIsRegistering, userRegistrationSuccess, userRegistrationFailure } from '../redux/actions';
import { Redirect } from 'react-router-dom';
import Form from './general/Form';

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(formValues) {
    this.props.dispatch(userIsRegistering());

    try {
      const response = await registerUser(
        formValues.username,
        formValues.password,
        formValues.email
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
        <Form
          handleSubmit={this.handleSubmit}
          inputFields={[
            {
              name: 'username',
              type: 'text',
              label: 'username',
              required: true
            },
            {
              name: 'password',
              type: 'password',
              label: 'password',
              required: true
            },
            {
              name: 'email',
              type: 'text',
              label: 'email',
              required: false
            }
          ]}
        />
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