import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import './TopNavBar.css';

class TopNavBar extends Component {
  render() {
    return (
      <div>
        <ul className='top-bar-nav'>
          <li>
            <NavLink exact activeClassName='active' to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName='active' to='/posts/create'>
              Create
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }
};

export default TopNavBar;
