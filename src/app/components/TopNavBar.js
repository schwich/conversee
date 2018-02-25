import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Logout from './Logout';

import './TopNavBar.css';

class TopNavBar extends Component {

  constructor(props) {
    super(props);

    let tab = this.props.location.pathname.slice(1); // remove / from the beginning

    this.state = {
      activeTab: tab
    }
  }

  handleTabChange = (tabName) => {
    this.setState({
      activeTab: tabName
    })
  }

  render() {
    return (
      <div>
        <ul className='top-bar-nav'>
          <Link to='/'>
            <li
              className={this.state.activeTab === 'home' ? 'top-bar-active-tab' : ''}
              onClick={() => { this.handleTabChange('home') }}>
              Home
            </li>
          </Link>
          <Link to='/posts/create'>
            <li
              className={this.state.activeTab === 'posts/create' ? 'top-bar-active-tab' : ''}
              onClick={() => { this.handleTabChange('posts/create') }}>
              Create Post <FontAwesomeIcon icon='plus' />
            </li>
          </Link>
          {
            this.props.userIsAuthed === false &&
            <div className='top-bar-nav-right-block'>
              <Link to='/login'>
                <li
                  className={this.state.activeTab === 'login' ? 'top-bar-active-tab' : ''}
                  onClick={() => { this.handleTabChange('login') }}>
                  Login <FontAwesomeIcon icon='sign-in-alt' />
                </li>
              </Link>
              <Link to='/register'>
                <li
                  className={this.state.activeTab === 'register' ? 'top-bar-active-tab' : ''}
                  onClick={() => { this.handleTabChange('register') }}>
                  Register <FontAwesomeIcon icon='user-plus' />
                </li>
              </Link>
            </div>
          }
          {
            this.props.userIsAuthed === true
            &&
            <div className='top-bar-nav-right-block'>
              <Link to={`/account/${this.props.uid}`}>
                <li
                  className={this.state.activeTab === 'account' ? 'top-bar-active-tab' : ''}
                  onClick={() => { this.handleTabChange('account') }}>
                  <FontAwesomeIcon icon='user' /> {this.props.username}
                </li>
              </Link>
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
    userIsAuthed: state.user.authed,
    username: state.user.username,
    uid: state.user.uid
  }
}

export default withRouter(connect(mapStateToProps)(TopNavBar));
