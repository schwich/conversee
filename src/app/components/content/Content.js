import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { randomsubReddit, randomNum } from '../../helpers/random-content';
import VotePanel from './VotePanel';
import ControlPanel from './ControlPanel';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { userSavedPost, userHidPost } from '../../redux/actions';
import { hidePost } from '../../api/posts-api';

import './Content.css';

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isTextPost: props.type === 'text' ? true : false,
      isPostHidden: false,
      isTextPostExpanded: false
    }

    this.onHidePost = this.onHidePost.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userHiddenPosts !== null) {
      if (nextProps.userHiddenPosts[nextProps.id] != undefined) {
        this.setState({
          isPostHidden: true
        })
      }
    }
  }

  async onHidePost() {
    this.setState({
      isPostHidden: true
    })

    // todo dispatch action to record that post is hidden
    this.props.dispatch(userHidPost(this.props.id))
    await (hidePost(this.props.id));
  }

  onExpandControlClick = () => {
    this.setState({
      isTextPostExpanded: !this.state.isTextPostExpanded
    })
  }

  render() {

    if (this.state.isPostHidden) {
      return null
    }

    const {
      title,
      numPoints,
      timestamp,
      tags,
      owner,
      id,
      userVoted,
      type,
      link,
      content
    } = this.props;

    return (
      <div className='content-post'>
        <VotePanel postId={id} />
        <div className='content-wrapper'>
          <Title
            title={title}
            postId={id}
            link={link}
            type={type} />
          <div className='content-inner-wrapper'>
            {
              this.state.isTextPost === true
                ?
                <div className='content-textbox-control'>
                  <ExpandControl
                    isExpanded={this.state.isTextPostExpanded}
                    onClick={this.onExpandControlClick} />
                </div>
                :
                null
            }
            <div className='content-panels-wrapper'>
              <TagPanel tags={tags} />
              <MetaPanel
                numPoints={numPoints}
                timestamp={timestamp}
                owner={owner}
                subreddit={randomsubReddit()} />
              <ControlPanel
                numComments={randomNum()}
                onHide={this.onHidePost}
                postId={id} />
            </div>
          </div>
          {
            this.state.isTextPostExpanded === true
              ?
              <ExpandedTextPost content={content} />
              :
              null
          }
        </div>
      </div>
    )
  }
}

// domain should strip unneeded parts of link (URL)
// prob will need to be upgraded to class
// or maybe just use a helper function?
// todo
function Title(props) {
  // todo strip unneeded parts of link for the domain view
  return (
    <div>
      {
        props.type === 'link'
          ?
          <div className='content-title'>
            <div className='content-title-main'>
              <a href={`http://${props.link}`}>{props.title}</a>
            </div>
            <div className='content-title-domain'>
              <a href={`http://${props.link}`}>( {props.link} )</a>
            </div>
          </div>
          :
          <div className='content-title'>
            <div className='content-title-main'>
              <Link to={`/posts/${props.postId}`}>{props.title}</Link>
            </div>
          </div>
      }
    </div>
  )
}

function TagPanel(props) {
  return (
    <div className='content-tag-panel'>
      {
        props.tag != null
          ?
          props.tags.map((tag) => {
            return (
              <div className='content-tag'>
                <a href='#'>
                  <i className='fa fa-tag' aria-hidden='true' style={{ marginRight: '2px' }}></i>
                  {tag}
                </a>
              </div>
            )
          })
          : null
      }
    </div>
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
      {numPoints} points | submitted {moment().from(timestamp, true)} ago by <span
        className='subtle-underline'>{owner}</span> to <span className='subtle-underline'>{subreddit}</span>
    </div>
  )
}

function ExpandControl(props) {
  return (
    <button onClick={props.onClick}>
      {
        props.isExpanded === true
          ?
          <FontAwesomeIcon icon='times' />
          :
          <FontAwesomeIcon icon='caret-down' />
      }
    </button>
  )
}

function ExpandedTextPost(props) {
  return (
    <div className='content-expanded-text-post'>{props.content}</div>
  )
}

function mapStateToProps(state) {
  return {
    userHiddenPosts: state.user.userHiddenPosts
  }
}

export default connect(mapStateToProps)(Content);