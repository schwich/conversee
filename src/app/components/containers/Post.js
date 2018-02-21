import React from 'react';
import { connect } from 'react-redux';

import './Post.css';

class Post extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div>Post {this.props.match.params.postId}</div>
    )
  }
}

export default connect()(Post)