import React from 'react';
import { connect } from 'react-redux';
import SubTab from '../general/SubTab';
import { getUserSavedPosts, getUserHiddenPosts } from '../../api/users-api';
import { getUserPosts } from '../../api/users-api';
import Content from '../content/Content';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './Account.css';

export const accountTabNames = {
  OVERVIEW: 'Overview',
  USER_POSTS: 'User Posts',
  USER_COMMENTS: 'User Comments',
  SAVED_POSTS: 'Saved Posts',
  SAVED_COMMENTS: 'Saved Comments',
  UPVOTED: 'Upvoted',
  DOWNVOTED: 'Downvoted',
  HIDDEN: 'Hidden'
}

class Account extends React.Component {

  state = {
    content: null
  }

  constructor(props) {
    super(props);

    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {
    // todo get default tab data
  }

  async onTabChange(tabName) {
    let { params } = this.props.match;

    switch (tabName) {
      case accountTabNames.OVERVIEW:
        // todo  
        break;

      case accountTabNames.USER_POSTS:
        const userPosts = await getUserPosts(params.userId);
        this.setState({
          content: userPosts
        })
        break;

      case accountTabNames.USER_COMMENTS:
        break;

      case accountTabNames.SAVED_POSTS:
        const userSavedPosts = await getUserSavedPosts(params.userId)
        this.setState({
          content: userSavedPosts
        })
        break;

      case accountTabNames.SAVED_COMMENTS:
        break;

      case accountTabNames.UPVOTED:
        break;

      case accountTabNames.DOWNVOTED:
        break;

      case accountTabNames.HIDDEN:
        const userHiddenPosts = await getUserHiddenPosts(params.userId);
        this.setState({
          content: userHiddenPosts
        })
        break;
    }
  }

  render() {
    let { match, username } = this.props;

    let tabs = [
      { name: accountTabNames.OVERVIEW, link: `${match.url}` },
      { name: accountTabNames.USER_POSTS, link: `${match.url}/posts` },
      { name: accountTabNames.USER_COMMENTS, link: `${match.url}/comments` }
    ]

    if (this.props.uid == this.props.match.params.userId) {
      tabs = [
        ...tabs,
        { name: accountTabNames.SAVED_POSTS, link: `${match.url}/posts/saved` },
        { name: accountTabNames.SAVED_COMMENTS, link: `${match.url}/comments/saved` },
        { name: accountTabNames.UPVOTED, link: `${match.url}/upvoted` },
        { name: accountTabNames.DOWNVOTED, link: `${match.url}/downvoted` },
        { name: accountTabNames.HIDDEN, link: `${match.url}/posts/hidden` }
      ]
    }

    return (
      <div className='user-account-container'>
        <h2>{username}</h2>
        <p>This will eventually have all of your account details.</p>
        <SubTab
          defaultTab={accountTabNames.OVERVIEW}
          onTabChange={this.onTabChange}
          tabs={tabs}
        />

        <Route exact path={`${match.url}`} render={() => <Overview content={this.state.content} />} />
        <Route exact path={`${match.url}/posts`} render={() => <ShowPosts content={this.state.content} />} />
        <Route exact path={`${match.url}/comments`} render={() => <UserComments content={this.state.content} />} />

        {
          this.props.isAuthed && (this.props.uid == this.props.match.params.userId) //todo this isn't secure 
            ?
            <div>
              <Route path={`${match.url}/posts/saved`} render={() => <ShowPosts content={this.state.content} />} />
              <Route path={`${match.url}/comments/saved`} render={() => <SavedComments content={this.state.content} />} />
              <Route path={`${match.url}/upvoted`} render={() => <Upvoted content={this.state.content} />} />
              <Route path={`${match.url}/downvoted`} render={() => <Downvoted content={this.state.content} />} />
              <Route path={`${match.url}/posts/hidden`} render={() => <ShowPosts content={this.state.content} />} />
            </div>
            :
            null
        }

      </div>
    )
  }
}

function Overview(props) {
  return (
    <div>Overview</div>
  )
}

function ShowPosts(props) {
  return (
    <div>
      {
        props.content != null || props.content != undefined
          ?
          props.content.map((post) => {
            return <Content
              key={post.id}
              id={post.id}
              type={post.type}
              title={post.title}
              link={post.link}
              numPoints={post.num_points}
              timestamp={post.created}
              tags={post.tags}
              owner={post.owner}
              content={post.content} />
          })
          :
          <div>Loading...</div>
      }
    </div>
  )
}

function UserComments(props) {
  return (
    <div>User Comments</div>
  )
}

function SavedComments(props) {
  return (
    <div>Saved Comments</div>
  )
}

function Upvoted(props) {
  return (
    <div>Upvoted</div>
  )
}

function Downvoted(props) {
  return (
    <div>Downvoted</div>
  )
}

function mapStateToProps(state) {
  return {
    username: state.user.username,
    uid: state.user.uid,
    isAuthed: state.user.authed
  }
}

export default connect(mapStateToProps)(Account);