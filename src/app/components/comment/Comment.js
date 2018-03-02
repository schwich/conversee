import React from 'react';
import moment from 'moment';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import CommentReply from './CommentReply';
import CommentVotePanel from './CommentVotePanel';

import { submitReply } from '../../api/comments-api';

import './Comment.css';

export default class Comment extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmitReply = this.onSubmitReply.bind(this);
  }

  async onSubmitReply(replyText, commentIdx) {
    event.preventDefault();
    console.log(replyText, this.props.id);
    console.log(replyText, ' ',  commentIdx);
    await submitReply(this.props.postId, this.props.id, replyText, commentIdx)
  }

  render() {
    return (
      <div
        className={`comment-container ${this.props.nestLevel % 2 === 0 ? 'comment-container-even' : 'comment-container-odd'}`}
        style={{marginLeft: this.props.nestLevel * 20}}>
        <div>
          <CommentVotePanel />
          <div>
            <CommentMetaPanel
              username={this.props.username}
              created={this.props.created} />
            <div>{this.props.content}</div>
            <CommentControlPanel />
          </div>
        </div>
        <CommentReply 
          idx={this.props.idx}
          showByDefault={true}
          showCancel={false}
          commentId={this.props.id}
          onSubmit={this.onSubmitReply} />
        <div>
          {
            this.props.replies != null 
            ?
            this.props.replies.map((reply) => {
              console.log(reply);
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
                  replies={reply.replies} />
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
    <div>{props.username} {moment().from(props.created, true)} ago</div>
  )
}

function CommentControlPanel(props) {
  return (
    <div></div>
  )
}


