import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Logout from './Logout';

import './TopNavBar.css';

class TopNavBar extends Component {

  render() {
    return (
      <div className='top-bar-nav'>
        <NavLink
          to='/'
          exact
          activeClassName='top-bar-active-tab'>
          <FontAwesomeIcon icon='magic' /><span style={{ fontWeight: '300', fontWeight: '400', letterSpacing: '0.2rem', marginLeft: '15px' }}>Converseer</span>
        </NavLink>
        <NavLink
          to='/posts/create'
          activeClassName='top-bar-active-tab'>
          Create Post <FontAwesomeIcon icon='plus' />
        </NavLink>
        {
          this.props.userIsAuthed === false &&
          <div className='top-bar-nav-right-block'>
            <NavLink
              to='/login'
              activeClassName='top-bar-active-tab'>
              Login <FontAwesomeIcon icon='sign-in-alt' />
            </NavLink>
            <NavLink
              to='/register'
              activeClassName='top-bar-active-tab'>
              Register <FontAwesomeIcon icon='user-plus' />
            </NavLink>
          </div>
        }
        {
          this.props.userIsAuthed === true &&
          <div className='top-bar-nav-right-block'>
            <NavLink
              to={`/account/${this.props.uid}`}
              activeClassName='top-bar-active-tab'>
              <FontAwesomeIcon icon='user' /> {this.props.username}
            </NavLink>
            <Logout />
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userIsAuthed: state.user.authed,
    username: state.user.username,
    uid: state.user.uid
  }
}

export default withRouter(connect(mapStateToProps)(TopNavBar));
