import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../api/auth-api';

import { userIsAuthing, userAuthSuccess, userAuthFailure } from '../redux/actions';

import Form from './general/Form';

import './Login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(formValues) {
    this.props.dispatch(userIsAuthing());

    try {
      const response = await loginUser(formValues.username, formValues.password);

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

export default connect(mapStateToProps)(Login)