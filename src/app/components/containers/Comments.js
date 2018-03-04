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

  async onSubmitTopLevelReply(replyText) {
    const results = await submitComment(this.props.match.params.postId, replyText);
    this.setState((prevState) => {
      return {
        comments: {
          replies: [
            results.comment,
            ...prevState.comments.replies
          ]
        }
      }
    })
  }

  render() {
    return (
      <div>
        <div className='comments-container-top-level-reply'>
          <CommentReply
            height='8'
            width='100'
            showByDefault={true}
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
                  (this.state.comments.replies != null) &&
                  this.state.comments.replies.map(comment => {
                    return (<Comment
                      idx={comment._idx}
                      id={comment._commentId}
                      postId={this.props.match.params.postId}
                      nestLevel={1}
                      key={comment._commentId}
                      content={comment.content}
                      userId={comment.userId}
                      username={comment.username}
                      created={comment.created}
                      replies={comment.replies} />)
                  })
                }
              </div>

          }
        </div>
      </div>
    )
  }
}

export default connect()(Comments);