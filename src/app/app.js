import React from 'react';
import TopNavBar from './components/TopNavBar';
import { connect } from 'react-redux';
import { sayHelloWorld } from './redux/actions';
import DisplayText from './components/DisplayText';
import { getAllPosts } from './api/posts-api';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Main from './components/containers/Main';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Account from './components/account/Account';
import Register from './components/Register';
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

  // handleClick = (event) => {
  //   this.props.dispatch(sayHelloWorld(this.state.text));
  //   this.setState({ text: '' })
  // }

  // handleChange = (event) => {
  //   this.setState({ text: event.target.value })
  // }

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
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect()(App);