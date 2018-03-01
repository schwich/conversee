import React from 'react';
import { connect } from 'react-redux';

import Comment from '../comment/Comment';
import CommentReply from '../comment/CommentReply';

import { getComments, submitComment } from '../../api/comments-api';

import './Comments.css';


class Comments extends React.Component {

  state = {
    comments: null,
    loaded: false
  }

  constructor(props) {
    super(props);

    this.onSubmitTopLevelReply = this.onSubmitTopLevelReply.bind(this);
  }

  async componentDidMount() {
    const results = await getComments(this.props.match.params.postId);
    this.setState({
      comments: results,
      loaded: true
    })
  }

  async onSubmitTopLevelReply(replyData) {
    console.log(replyData);
    const results = await submitComment(this.props.match.params.postId, replyData.replyText)
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div className='comments-container-top-level-reply'>
          <CommentReply
            onSubmit={this.onSubmitTopLevelReply}
            showCancel={false} />
        </div>
        <div>
          {
            this.state.comments === null
              ?

              this.state.loaded === true
                ?
                <div>No comments yet!</div>
                :
                <div>Loading ...</div>

              :
              <div>
                {
                  this.state.comments.comments.map(comment => (
                    <Comment
                      id={comment._commentId}
                      nestLevel={1}
                      key={comment._commentId}
                      content={comment.content}
                      userId={comment.userId}
                      username={comment.username}
                      created={comment.created}
                      replies={comment.replies} />

                  ))
                }
              </div>

          }
        </div>
      </div>
    )
  }
}

export default connect()(Comments);