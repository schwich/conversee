import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Logout from './Logout';

import './TopNavBar.css';

class TopNavBar extends Component {

  state = {
    activeTab: 'home'
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
              onClick={() => {this.handleTabChange('home')}}>
                Home
            </li>
          </Link>
          <Link to='/posts/create'>
            <li
              className={this.state.activeTab === 'createPost' ? 'top-bar-active-tab' : ''}
              onClick={() => {this.handleTabChange('createPost')}}>
              Create Post <i className="fas fa-plus"></i>
            </li>
          </Link> 
          {
            this.props.userIsAuthed === false &&
            <div className='top-bar-nav-right-block'>
              <Link to='/login'>
                <li
                  className={this.state.activeTab === 'login' ? 'top-bar-active-tab' : ''}
                  onClick={() => {this.handleTabChange('login')}}>
                    Login <i className="fas fa-sign-in-alt"></i>
                </li>
              </Link>
              <Link to='/register'>
                <li
                  className={this.state.activeTab === 'register' ? 'top-bar-active-tab' : ''}
                  onClick={() => {this.handleTabChange('register')}}>
                    Register <i className="fas fa-user-plus"></i>
                </li>
              </Link>
            </div>
          }
          {
            this.props.userIsAuthed === true
            &&
            <div className='top-bar-nav-right-block'>
              <li
                className={this.state.activeTab === 'account' ? 'top-bar-active-tab' : ''}
                onClick={() => {this.handleTabChange('account')}}>
                <Link to='/account'>
                  <i className="fas fa-user"></i> {this.props.username}
                </Link>
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
    userIsAuthed: state.user.authed,
    username: state.user.username
  }
}

// export default connect(mapStateToProps)(TopNavBar);
export default withRouter(connect(mapStateToProps)(TopNavBar));
