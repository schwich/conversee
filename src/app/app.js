import React from 'react';
import TopNavBar from './components/TopNavBar';
import { connect } from 'react-redux';
import { sayHelloWorld } from './redux/actions';
import DisplayText from './components/DisplayText';
import { getAllPosts } from './api/posts-api';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Main from './components/containers/Main';
import CreatePost from './components/CreatePost';

class App extends React.Component {

  state = {
    text: '', // todo remove
    posts: null
  }

  async componentDidMount() {
    const posts = await getAllPosts();
    this.setState(() => ({ posts }))
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
          </Switch>
        </div>
      </Router>

      // <div>
      //   <DisplayText />
      //   <input
      //     type='text'
      //     value={this.state.text}
      //     onChange={this.handleChange} />
      //   <button onClick={this.handleClick}>Click</button>
      // </div>

    )
  }
}
export default App;
// export default connect()(App)
