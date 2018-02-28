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
  }

  render() {
    return (
      <div className='comment-vote-panel'>
      <button
        className=''
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