import React from 'react';
import { connect } from 'react-redux';

import Comment from '../comment/Comment';

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
    return (
      <div>
        <div>
          {
            this.state.comments !== null 
            ?
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
                      replies={comment.replies}/>

                ))
              }
            </div>
            : 
            <div>Loading...</div>
          }
        </div>
      </div>
    )
  }
}

export default connect()(Comments);