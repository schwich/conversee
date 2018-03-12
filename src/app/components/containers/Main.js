import React, { Component } from 'react';
import { connect } from 'react-redux'
import Content from '../content/Content';
import SubTab from '../general/SubTab';
import Pagination from '../general/Pagination';
import { getAllPosts, getMorePosts } from '../../api/posts-api';
import { getUserVotes, getUserHiddenPosts, getUserSavedPosts } from '../../api/users-api';
import { postsLoaded, morePosts, userVotesLoaded, userHiddenPostsLoaded, userSavedPostsLoaded } from '../../redux/actions';
import queryString from 'query-string';

import './Main.css';

export const mainTabNames = {
  TOP: 'Top',
  BEST: 'Best',
  TRENDING: 'Trending',
  NEW: 'New',
  CONTROVERSIAL: 'Controversial'
};

class Main extends Component {

  state = {
    posts: null
  };

  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleNextPrevPosts = this.handleNextPrevPosts.bind(this);
  }

  async handleTabChange(tabName) {
    const pageNum = 1;
    const sortType = tabName.toLowerCase();

    const posts = await getMorePosts(sortType, pageNum);
    this.props.dispatch(morePosts(posts, pageNum, sortType));
  };

  async handleNextPrevPosts(nextOrPrev, sortType, pageNum) {

    let page;
    if (nextOrPrev == 'next') {
      page = pageNum + 1;
    }
    else {
      page = pageNum - 1;
    }
  
    const posts = await getMorePosts(sortType, page);
    this.props.dispatch(morePosts(posts, page, sortType));
    this.props.history.push(`/${sortType}/page/${page}`);
  }

  async componentDidMount() {

    let posts;
    let page = 1;
    let sortType = mainTabNames.TOP.toLowerCase();
    if (this.props.match.params.postSortType) {

      sortType = this.props.match.params.postSortType;

      if (this.props.match.params.pageNum) {
        page = this.props.match.params.pageNum;
      }

      posts = await getMorePosts(sortType, page);
    }
    else {
      posts = await getMorePosts(sortType, page)
    }

    this.props.dispatch(morePosts(posts, page, sortType));

    // get the logged in user's votes on the posts (if any)
    if (this.props.userIsAuthed) {
      // todo do these run in parallel and if not how do I make them do so?
      // not use async / await ?
      const userVotes = await (getUserVotes(this.props.userId));
      this.props.dispatch(userVotesLoaded(userVotes));

      const userHiddenPosts = await (getUserHiddenPosts(this.props.userId));
      this.props.dispatch(userHiddenPostsLoaded(userHiddenPosts));

      const userSavedPosts = await (getUserSavedPosts(this.props.userId));
      this.props.dispatch(userSavedPostsLoaded(userSavedPosts));
    }
  }

  render() {

    let { match } = this.props;

    let tabs = [
      { name: mainTabNames.TOP, link: `/`},
      { name: mainTabNames.BEST, link: `/best`},
      { name: mainTabNames.TRENDING, link: `/trending`},
      { name: mainTabNames.NEW, link: `/new`},
      { name: mainTabNames.CONTROVERSIAL, link: `/controversial`}
    ];

    return (
      <div className='main-container'>
        <SubTab 
          defaultTab={mainTabNames.TOP}
          activeTab={this.props.postSortType}
          onTabChange={this.handleTabChange}
          tabs={tabs}/>
        <div className='main-container-posts-container'>
          {
            this.props.posts.posts !== null
              ?
              this.props.posts.posts.map((post) => {
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

        <Pagination onMore={this.handleNextPrevPosts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    postSortType: state.posts.sortType,
    postPageNum: state.posts.pageNum,
    userIsAuthed: state.user.authed,
    userId: state.user.uid
  }
}

export default connect(mapStateToProps)(Main)