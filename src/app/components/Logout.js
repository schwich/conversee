import React from 'react';
import { connect } from 'react-redux';
import { userLoggedOut } from '../redux/actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Logout extends React.Component {

  onClick = (event) => {
    window.localStorage.clear();
    this.props.dispatch(userLoggedOut());
  }

  render() {
    return (
      <a
        style={{ cursor: 'pointer' }}
        onClick={this.onClick}>
        Logout <FontAwesomeIcon icon='sign-out-alt' />
      </a>
    )
  }
}

export default connect()(Logout);
