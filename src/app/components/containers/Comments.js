import React from 'react';
import { connect } from 'react-redux';

import {getComments} from '../../api/comments-api';

class Comments extends React.Component {

  state = {
    comments: null
  }

  constructor(props) {
    super(props);

  
  }

  async componentDidMount() {
    const results = await getComments(this.props.match.params.postId);
    this.setState({
      comments: results
    })
  }

  render() {
    console.log(this.state.comments);
    return (
      <div>
        {
          this.state.comments !== null 
          ?
          <div>
            {
              this.state.comments.comments.map(comment => {
                console.log('fucking comment: ', comment);
                return (
                  <Comment 
                  nestLevel={1}
                  key={comment._commentId}
                  content={comment.content}
                  userId={comment.userId}
                  replies={comment.replies}/>
                )

              })
            }
          </div>
          : 
          <div>Loading...</div>
        }
      </div>
    )
  }
}

function Comment(props) {
  console.log('yolo');
  console.log(props);
  return (
    <div style={{marginLeft: props.nestLevel * 20}}>
      <div>
        {props.content}
      </div>
      <div>
        {props.userId}
      </div>
      {
        props.replies != null 
          ?
          props.replies.map((reply) => {
            return (
              <Comment
                nestLevel={props.nestLevel + 1}
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

export default connect()(Comments);