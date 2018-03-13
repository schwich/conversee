import React from 'react';
import { vote, unvote } from '../../api/posts-api';
import { connect } from 'react-redux';
import db from '../../helpers/db';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import './VotePanel.css';
import { userVoted, userUnVoted } from '../../redux/actions';

class VotePanel extends React.Component {

  constructor(props) {
    super(props);

    let state = {};
    if (props.userVotes !== null) {
      if (props.userVotes[props.postId] != null) {
        if (props.userVotes[props.postId] === 'up') {
          state = {
            votedUp: true,
            votedDown: false
          }
        }
        else if (props.userVotes[props.postId] === 'down') {
          state = {
            votedUp: false,
            votedDown: true
          }
        }
        else {
          state = {
            votedUp: false,
            votedDown: false
          }
        }
      }
    }

    this.state = state;

    this.handleVote = this.handleVote.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.userVotes !== null) {
      if (nextProps.userVotes[nextProps.postId] != null) {
        if (nextProps.userVotes[nextProps.postId] === 'up') {

          this.setState({
            votedUp: true,
            votedDown: false
          })
        }
        else if (nextProps.userVotes[nextProps.postId] === 'down') {
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
    }
  }

  async handleVote(type, postId) {

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

    if (!isUnvote) {
      try {
        const response = await vote(postId, type);
        this.props.dispatch(userVoted(postId, type))
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      try {
        const response = await unvote(postId, type);
        this.props.dispatch(userUnVoted(postId))
      }
      catch (error) {
        console.log(error);
      }
    }

  }

  render() {
    return (
      <div className='content-vote-panel'>
        <button
          className={this.state.votedUp === true ? 'voted-up' : ''}
          onClick={() => this.handleVote('up', this.props.postId)}>
          <FontAwesomeIcon icon='arrow-up' />
        </button>
        <button
          className={this.state.votedDown === true ? 'voted-down' : ''}
          onClick={() => this.handleVote('down', this.props.postId)}>
          <FontAwesomeIcon icon='arrow-down' />
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userVotes: state.user.userVotes
  }
}

export default connect(mapStateToProps)(VotePanel)