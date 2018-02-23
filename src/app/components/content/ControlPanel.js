import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ControlPanel extends React.Component {

  state = {
    saved: false
  }

  constructor(props) {
    super(props);

    this.onSavePost = this.onSavePost.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userSavedPosts !== null) {
      if (nextProps.userSavedPosts[nextProps.postId] != undefined) {
        this.setState({
          saved: true
        })
      }
    }
  }

  async onSavePost() {
    this.setState({
      saved: !this.state.saved
    })

    this.props.dispatch(userSavedPost(this.props.postId));

    await (savePost(this.props.postId))
  }

  render() {
    return (
      <div className='content-control-panel'>
        <Link to={`/posts/${this.props.postId}/comments`}>{this.props.numComments} comments</Link> |
      <button className={this.state.saved === true ? 'post-saved' : ''} onClick={this.onSavePost}>
          {this.state.saved ? 'saved' : 'save'}
        </button>|
      <button onClick={this.props.onHide}>hide</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userSavedPosts: state.user.userSavedPosts
  }
}

export default connect(mapStateToProps)(ControlPanel)