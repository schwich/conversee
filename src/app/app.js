import React from 'react';

import { connect } from 'react-redux';
import { sayHelloWorld } from './redux/actions';

class App extends React.Component {

  state = {
    text: ''
  }

  handleClick = (event) => {
    this.props.dispatch(sayHelloWorld(this.state.text));
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ text: value})
  }

  render() {
    return (
      <div>
        <p>{this.props.hello}</p>
        <input 
          type='text'
          value={this.state.text}
          onChange={this.handleChange} />
        <button onClick={this.handleClick}>Click</button>
      </div>
  
    )
  }
}

function mapStateToProps(state) {
  return {
    hello: state.posts.hello
  }
}

export default connect(mapStateToProps)(App)
