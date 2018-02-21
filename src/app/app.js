import React from 'react';
import TopNavBar from './components/TopNavBar';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/containers/Main';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Account from './components/account/Account';
import Register from './components/Register';
import Post from './components/containers/Post';
import Comments from './components/containers/Comments';
import { userAuthSuccess } from '../app/redux/actions';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import pack from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(pack);

class App extends React.Component {

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
          <TopNavBar/>
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route path='/posts/create' component={CreatePost}/>
            <Route path='/login' component={Login}/>
            <Route path='/account' component={Account}/>
            <Route path='/register' component={Register}/>
            <Route path='/posts/:postId/comments' component={Comments} />
            <Route path="/posts/:postId" component={Post}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect()(App);