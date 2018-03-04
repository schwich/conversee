import React from 'react';
import moment from 'moment';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import CommentReply from './CommentReply';
import CommentVotePanel from './CommentVotePanel';
import { submitReply } from '../../api/comments-api';

import './Comment.css';

export default class Comment extends React.Component {

  state = {
    isReplyExpanded: false,
    replies: null
  }

  constructor(props) {
    super(props);
    this.state = {
      isReplyExpanded: false,
      replies: this.props.replies
    }
    this.onSubmitReply = this.onSubmitReply.bind(this);
  }

  async onSubmitReply(replyText, commentIdx) {
    event.preventDefault();

    const newComment = await submitReply(this.props.postId, this.props.id, replyText, commentIdx);
    this.setState({
      replies: [
        newComment.comment,
        ... this.state.replies
      ],
      isReplyExpanded: false
    })
  }

  showReply = () => {
    this.setState({
      isReplyExpanded: !this.state.isReplyExpanded
    })
  }

  cancelReply = () => {
    this.setState({
      isReplyExpanded: false
    })
  }

  render() {
    return (
      <div className={`comment-container ${this.props.nestLevel % 2 === 0 ? 'comment-container-even' : 'comment-container-odd'}`}>
        <div className='comment-parent'>
          <CommentVotePanel />
          <div>
            <CommentMetaPanel
              username={this.props.username}
              created={this.props.created} />
            <div className='comment-content'>{this.props.content}</div>
            <CommentControlPanel showReply={this.showReply} />
          </div>
        </div>
        <CommentReply
          isShowing={this.state.isReplyExpanded}
          onCancel={this.cancelReply}
          idx={this.props.idx}
          commentId={this.props.id}
          onSubmit={this.onSubmitReply} />
        <div>
          {
            this.state.replies != null
              ?
              this.state.replies.map((reply) => {
                return (
                  <Comment
                    idx={reply._idx}
                    id={reply._commentId}
                    key={reply._commentId}
                    postId={this.props.postId}
                    nestLevel={this.props.nestLevel + 1}
                    content={reply.content}
                    userId={reply.userId}
                    username={reply.username}
                    created={reply.created}
                    replies={reply.replies}
                    onReply={this.props.onReply} />
                )
              })
              :
              null
          }
        </div>
      </div>
    )
  }
}

function CommentMetaPanel(props) {
  return (
    <div className='comment-meta-panel'>
      <span className='username'>{props.username}</span> {moment().from(props.created, true)} ago
    </div>
  )
}

function CommentControlPanel(props) {
  return (
    <div className='comment-control-panel'>
      <button
        className='comment-control-panel-reply'
        onClick={props.showReply}>
        reply
      </button>
    </div>
  )
}


