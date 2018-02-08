import React from 'react';

import { connect } from 'react-redux';
import { sayHelloWorld } from './redux/actions';
import DisplayText from './components/DisplayText';

class App extends React.Component {

  state = {
    text: ''
  }

  handleClick = (event) => {
    this.props.dispatch(sayHelloWorld(this.state.text));
    this.setState({ text: ''})
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value})
  }

  render() {
    return (
      <div>
        <DisplayText />
        <input 
          type='text'
          value={this.state.text}
          onChange={this.handleChange} />
        <button onClick={this.handleClick}>Click</button>
      </div>
  
    )
  }
}

export default connect()(App)
