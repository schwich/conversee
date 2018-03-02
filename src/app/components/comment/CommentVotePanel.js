import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';

import './CommentVotePanel.css';

class CommentVotePanel extends React.Component {

  state = {
    votedUp: false,
    votedDown: false
  }

  constructor(props) {
    super(props);

    this.handleVote = this.handleVote.bind(this);
  }

  async handleVote(voteType) {
    console.log('comment handleVote called with ', voteType);
    let isUnvote = false;
    if (type === 'up' && this.state.votedUp !== true) {
      this.setState({
        votedUp: true,
        votedDown: false
      })
    }
    else if (type === 'down' && this.state.votedDown !== true) {
      this.setState({
        votedUp: false,
        votedDown: true
      })
    }
    else {
      isUnvote = true;
      this.setState({
        votedUp: false,
        votedDown: false
      })
    }
  }

  render() {
    return (
      <div className='comment-vote-panel'>
      <button
        className={this.state.votedUp === true ? 'voted-up' : ''}
        onClick={() => this.handleVote('up')}>
        <FontAwesomeIcon icon='arrow-up' />
      </button>
      <button
        className={this.state.votedDown === true ? 'voted-down' : ''}
        onClick={() => this.handleVote('down')}>
        <FontAwesomeIcon icon='arrow-down' />
      </button>
    </div>
    )
  }
}

export default connect()(CommentVotePanel)