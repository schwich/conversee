import React from 'react';
import { vote } from "../../api/posts-api";
import db from '../../helpers/db';
import './VotePanel.css';

export default class VotePanel extends React.Component {

  state = {
    votedUp: false,
    votedDown: false
  };

  constructor(props) {
    super(props);

    this.state = {
      votedUp: props.votedUp,
      votedDown: props.votedDown
    };

    this.handleVote = this.handleVote.bind(this);
  }

  async handleVote(type, postId) {
    // record vote in local DB
    db.userVotes.put({
      postId,
      type
    });

    // then tell server about the vote
    try {
      const response = await vote(postId, type);
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className='content-vote-panel'>
        <button
          className={this.state.votedUp === true ? 'voted' : ''}
          onClick={() => this.handleVote('up', this.props.postId)}>
          <i className='fas fa-arrow-up' aria-hidden='true'></i>
        </button>
        <button
          className={this.state.votedDown === true ? 'voted' : ''}
          onClick={() => this.handleVote('down', this.props.postId)}>
          <i className='fas fa-arrow-down' aria-hidden='true'></i></button>
      </div>
    )
  }
}