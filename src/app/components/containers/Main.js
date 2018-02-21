import React, { Component } from 'react';
import { connect } from 'react-redux'
import Content from '../content/Content';
import { getAllPosts, getUserVotes } from '../../api/posts-api';
import { postsLoaded, userVotesLoaded } from '../../redux/actions';

import './Main.css';

class Main extends Component {

  state = {
    posts: null,
    activeTab: 'best'
  };

  handleTabChange = (tabName) => {
    this.setState({
      activeTab: tabName
    })
  };

  async componentDidMount() {
    // get posts
    const posts = await getAllPosts();
    this.props.dispatch(postsLoaded(posts));

    // get the logged in user's votes on the posts (if any)
    if (this.props.userIsAuthed) {
      const userVotes = await(getUserVotes(this.props.userId)); 
      this.props.dispatch(userVotesLoaded(userVotes));
    }
  }

  render() {

    return (
      <div className='main-container'>
        <div className='main-container-posts-order-tab-bar'>
          <ul>
            <li
              className={this.state.activeTab === 'best' ? 'active-posts-order-tab' : ''}
              onClick={() => {this.handleTabChange('best')}}>
              best
            </li>
            <li
              className={this.state.activeTab === 'trending' ? 'active-posts-order-tab' : ''}
              onClick={() => {this.handleTabChange('trending')}}>
              trending
            </li>
            <li
              className={this.state.activeTab === 'new' ? 'active-posts-order-tab' : ''}
              onClick={() => {this.handleTabChange('new')}}>
              new
            </li>
            <li
              className={this.state.activeTab === 'controversial' ? 'active-posts-order-tab' : ''}
              onClick={() => {this.handleTabChange('controversial')}}>
              controversial
            </li>
          </ul>
        </div>
        <div className='main-container-posts-container'>
        {
          this.props.posts.posts !== null
            ?

              // Object.keys(this.props.posts.posts).map((postId) => {
              //   const post = this.props.posts.posts[postId];
              //   return <Content
              //     key={post.id}
              //     id={post.id}
              //     title={post.title}
              //     domain={post.link}
              //     numPoints={post.num_points}
              //     timestamp={post.created}
              //     tags={post.tags}
              //     owner={post.owner}
              //     userVoted={post.userVoted}
              //   />
              // })

            this.props.posts.posts.map((post) => {
              return <Content
                key={post.id}
                id={post.id}
                title={post.title}
                domain={post.link}
                numPoints={post.num_points}
                timestamp={post.created}
                tags={post.tags}
                owner={post.owner} />
            })
            :
            <div>Loading...</div>
        }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    userIsAuthed: state.user.authed,
    userId: state.user.uid
  }
}

export default connect(mapStateToProps)(Main)