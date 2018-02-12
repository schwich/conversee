import React from 'react';
import { connect } from 'react-redux';
import { userLoggedOut } from '../redux/actions';

class Logout extends React.Component {

  onClick = (event) => {
    this.props.dispatch(userLoggedOut());
  }

  render() {
    return (
      <a onClick={this.onClick}>
        Logout <i className="fas fa-sign-out-alt"></i>
      </a>
    )
  }
}

export default connect()(Logout);
