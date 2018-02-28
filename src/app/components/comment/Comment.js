import React from 'react';

import './Comment.css';

export default class Comment extends React.Component {

  render() {
    return (
      <div style={{marginLeft: this.props.nestLevel * 20}}>
        <div>
          {this.props.content}
        </div>
        <div>
          {this.props.userId}
        </div>
        {
          this.props.replies != null 
            ?
            this.props.replies.map((reply) => {
              return (
                <Comment
                  id={reply._commentId}
                  key={reply._commentId}
                  nestLevel={this.props.nestLevel + 1}
                  content={reply.content}
                  userId={reply.userId}
                  replies={reply.replies} />
              )
            })
            :
            null
        }
      </div>
    )
  }
}