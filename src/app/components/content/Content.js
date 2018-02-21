import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { randomsubReddit, randomNum } from '../../helpers/random-content';
import VotePanel from './VotePanel';
import Button from '../Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { userSavedPost, userHidPost } from '../../redux/actions';
import { hidePost, savePost } from '../../api/posts-api';

import './Content.css';

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isTextPost: props.type === 'text' ? true : false,
      isPostSaved: false,
      isPostHidden: false,
      isTextPostExpanded: false
    }

    this.onSavePost = this.onSavePost.bind(this);
    this.onHidPost = this.onHidePost.bind(this);
  }

  async onSavePost() {
    this.setState({
      isPostSaved: !this.state.isPostSaved
    })

    this.props.dispatch(userSavedPost(this.props.id));

    await(savePost(this.props.id))
  }

  async onHidePost() {
    this.setState({
      isPostHidden: true
    })

    // todo dispatch action to record that post is hidden
    this.props.dispatch(userHidPost(this.props.id))
    await(hide(Postthis.props.id));
  }

  onExpandControlClick = () => {
    console.log('expand control clicked')
    this.setState({
      isTextPostExpanded: !this.state.isTextPostExpanded
    })
  }

  render() {

    if (this.state.isPostHidden) {
      return <div></div>
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
        <VotePanel postId={id}/>
        <div className='content-wrapper'>
          <Title 
            title={title} 
            postId={id}
            link={link}
            type={type}/>
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
            <TagPanel tags={tags}/>
            <MetaPanel
              numPoints={numPoints}
              timestamp={timestamp}
              owner={owner}
              subreddit={randomsubReddit()}/>
            <ControlPanel 
              numComments={randomNum()}
              onSave={this.onSavePost}
              onHide={this.onHidePost}
              postId={id}
              postIsSaved={this.state.isPostSaved}/>
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

function ControlPanel(props) {
  return (
    <div className='content-control-panel'>
      <Link to={`/posts/${props.postId}/comments`}>{props.numComments} comments</Link> | 
      <button className={props.postIsSaved === true ? 'post-saved' : ''} onClick={props.onSave}>
        {props.postIsSaved ? 'saved' : 'save'}
      </button>| 
      <button onClick={props.onHide}>hide</button>
    </div>
  )
}

function ExpandControl(props) {
  console.log(props);
  return (
    <button onClick={props.onClick}>
      {
       props.isExpanded === true 
        ?
          <FontAwesomeIcon icon='times' />
        :
          <FontAwesomeIcon icon='align-right' />
      }
    </button>
  )
}

function ExpandedTextPost(props) {
  return (
      <div className='content-expanded-text-post'>{props.content}</div>
  )
}

// Connect to Redux, don't need access to store so no mapStateToProps
export default connect()(Content);