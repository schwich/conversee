import React from 'react';
import { connect } from 'react-redux';

class Account extends React.Component {
  render() {
    return (
      <div className='user-account-container'>
        <h1>{this.props.username}</h1>
        <p>This will eventually have all of your account details.</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.users.username
  }
}

export default connect()(Account);