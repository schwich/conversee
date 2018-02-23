import React from 'react';
import { connect } from 'react-redux';

class Account extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className='user-account-container'>
        <h2>{this.props.username}</h2>
        <p>This will eventually have all of your account details.</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.username,
    uid: state.user.uid
  }
}

export default connect(mapStateToProps)(Account);