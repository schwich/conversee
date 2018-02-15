import React from 'react';
import TopNavBar from './components/TopNavBar';
import { connect } from 'react-redux';
import { sayHelloWorld } from './redux/actions';
import { getAllPosts } from './api/posts-api';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Main from './components/containers/Main';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Account from './components/account/Account';
import Register from './components/Register';
import Post from './components/Post';
import {userAuthSuccess} from '../app/redux/actions';

class App extends React.Component {

  state = {
    text: '', // todo remove
    posts: null
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    const uid = window.localStorage.getItem('uid');
    const username = window.localStorage.getItem('username');
    if (token && uid && username) {
      this.props.dispatch(userAuthSuccess(uid, username, token));
    }
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <TopNavBar />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/posts/create' component={CreatePost} />
            <Route path='/login' component={Login} />
            <Route path='/account' component={Account} />
            <Route path='/register' component={Register} />

            <Route path="/posts/:post_id" component={Post} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect()(App);