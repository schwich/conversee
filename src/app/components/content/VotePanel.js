import React from 'react';
import { vote } from "../../api/posts-api";
import db from '../../helpers/db';
import './VotePanel.css';

export default class VotePanel extends React.Component {

  constructor(props) {
    super(props);

    if (this.props.userVoted === 'up') {
      this.state = {
        votedUp: true,
        votedDown: false
      }
    }
    else if (this.props.userVoted === 'down') {
      this.state = {
        votedUp: false,
        votedDown: true
      }
    }
    else {
      this.state = {
        votedUp: false,
        votedDown: false
      }
    }

    this.handleVote = this.handleVote.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userVoted === 'up') {
      this.setState({
        votedUp: true,
        votedDown: false
      })
    }
    else if (nextProps.userVoted === 'down') {
      this.setState({
        votedUp: false,
        votedDown: true
      })
    }
    else {
      this.setState({
        votedUp: false,
        votedDown: false
      })
    }
  }

  async handleVote(type, postId) {

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
      this.setState({
        votedUp: false,
        votedDown: false
      })
    }

    try {
      const response = await vote(postId, type);
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className='content-vote-panel'>
        <button
          className={this.state.votedUp === true ? 'voted-up' : ''}
          onClick={() => this.handleVote('up', this.props.postId)}>
          <i className='fas fa-arrow-up' aria-hidden='true'></i>
        </button>
        <button
          className={this.state.votedDown === true ? 'voted-down' : ''}
          onClick={() => this.handleVote('down', this.props.postId)}>
          <i className='fas fa-arrow-down' aria-hidden='true'></i></button>
      </div>
    )
  }
}