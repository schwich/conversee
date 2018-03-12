import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Logout from './Logout';

import { mainTabNames } from './containers/Main';

import './TopNavBar.css';


class TopNavBar extends Component {

  isTabActive = (match, location) => {
    const pathname = location.pathname.split('/');
    switch (pathname[1]) {
      case 'posts':
      case 'login':
      case 'register':
      case 'account':
        return false;
        break;

      default:
        return true;
    }
  }

  render() {
    return (
      <div className='top-bar-nav'>
        <NavLink
          to='/'
          isActive={this.isTabActive}
          exact
          activeClassName='top-bar-active-tab'>
          <FontAwesomeIcon icon='magic' /><span style={{ fontWeight: '400', letterSpacing: '0.2rem', marginLeft: '15px' }}>Converseer</span>
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
