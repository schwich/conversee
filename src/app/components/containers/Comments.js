import React from 'react';
import { connect } from 'react-redux';

class Comments extends React.Component {
  render() {
    return (
      <div>Comments for {this.props.match.params.postId}</div>
    )
  }
}

export default connect()(Comments);