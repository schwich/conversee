import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import Logout from './Logout';

import './TopNavBar.css';

class TopNavBar extends Component {
  render() {
    return (
      <div>
        <ul className='top-bar-nav'>
          <li>
            <NavLink exact activeClassName='active-top-nav' to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName='active-top-nav' to='/posts/create'>
              Create Post <i className="fas fa-plus"></i>
            </NavLink>
          </li>
          {
            this.props.userIsAuthed === false &&
            <li className='top-bar-nav-login'>
              <NavLink activeClassName='active-top-nav' to='/login'>
                Login <i className="fas fa-sign-in-alt"></i>
              </NavLink>
            </li>
          }
          {
            this.props.userIsAuthed
            &&
            <div className='top-bar-nav-login'>
              <li >
                <NavLink activeClassName='active-top-nav' to='/account'>
                  <i className="fas fa-user"></i> {this.props.username}
                </NavLink>
              </li>
              <li>
                <Logout />
              </li>
            </div>
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userIsAuthed: state.users.authed,
    username: state.users.username
  }
}

// export default connect(mapStateToProps)(TopNavBar);
export default withRouter(connect(mapStateToProps)(TopNavBar));
