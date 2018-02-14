import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { randomThreeTags, randomUsername, randomsubReddit, randomNum } from '../../helpers/random-content';

import './Content.css';

class Content extends Component {

  handleVote = (type) => {
    console.log(`handleVoteCalled with: ${type}`);
  }

  render() {
    const { title, domain, numPoints, timestamp, tags, owner } = this.props;

    // there HAS to be a better way
    if (this.props.isOdd === false) {
      var styles = {
        backgroundColor: 'lightgray'
      }
    }
    else {
      var styles = {};
    }

    return (
      <div className='content-post' style={styles}>
        <VotePanel handleVote={this.handleVote} />
        <div className='content-wrapper'>
          <Title title={title} domain={domain} />
          <TagPanel tags={tags} />
          <MetaPanel
            numPoints={numPoints}
            timestamp={timestamp}
            owner={owner}
            subreddit={randomsubReddit()} />
          <ControlPanel numComments={randomNum()} />
        </div>
      </div>
    )
  }
}

function VotePanel(props) {
  return (
    <div className='content-vote-panel'>
      <button onClick={() => props.handleVote('up')}><i className='fas fa-arrow-up' aria-hidden='true'></i></button>
      <button onClick={() => props.handleVote('down')}><i className='fas fa-arrow-down' aria-hidden='true'></i></button>
    </div>
  )
}

// domain should strip unneeded parts of link (URL)
// prob will need to be upgraded to class
// or maybe just use a helper function?
// todo
function Title(props) {
  return (
    <div className='content-title'>
      <div className='content-title-main'>
        <a href='#'>{props.title}</a>
      </div>
      {
        props.domain !== ''
        &&
        (
          <div className='content-title-domain'>
            <a href='#' className='subtle-underline'>({props.domain})</a>
          </div>
        )
      }

    </div>
  )
}

function TagPanel(props) {
  return (
    <div className='content-tag-panel'>
      {
        props.tags.map((tag) => {
          return (
            <div className='content-tag'>
              <a href='#'>
                <i className='fa fa-tag' aria-hidden='true' style={{marginRight: '2px'}}></i>
                {tag}
              </a>
            </div>
          )
        })
      }
    </div >
  )
}

function MetaPanel(props) {

  const {
    numPoints,
    timestamp,
    owner,
    subreddit
  } = props;

  return (
    <div className='content-meta-panel'>
      {numPoints} points | submitted {moment().from(timestamp, true)} ago by <span className='subtle-underline'>{owner}</span> to <span className='subtle-underline'>{subreddit}</span>
    </div>
  )
}

function ControlPanel(props) {
  return (
    <div className='content-control-panel'>
      <a href='#'>{props.numComments} comments</a> | <button href='#'>save</button> | <button href='#'>hide</button>
    </div>
  )
}

// Connect to Redux, don't need access to store so no mapStateToProps
export default connect()(Content);