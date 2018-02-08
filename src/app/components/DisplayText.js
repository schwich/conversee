import React from 'react';
import { connect } from 'react-redux';

class DisplayText extends React.Component {

  render() {
    console.log(this.props);
    return (
      <h1>{this.props.text}</h1>
    )
  }
}

function mapStateToProps(state) {
  return {
    text: state.posts.hello
  }
}

export default connect(mapStateToProps)(DisplayText)