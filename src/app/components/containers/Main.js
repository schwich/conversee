import React, { Component } from 'react';
import { connect } from 'react-redux'
import Content from '../content/Content';
import SubTab from '../general/SubTab';
import Pagination from '../general/Pagination';
import { getAllPosts } from '../../api/posts-api';
import { getUserVotes, getUserHiddenPosts, getUserSavedPosts } from '../../api/users-api';
import { postsLoaded, userVotesLoaded, userHiddenPostsLoaded, userSavedPostsLoaded } from '../../redux/actions';
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

    let state = {};

    const queryParams = queryString.parse(props.location.search)
    if (queryParams.page != undefined) {
      state.pageNum = Number(queryParams.page)
    }

    this.state = state;

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  async handleTabChange(tabName) {
    const posts = await getAllPosts(tabName.toLowerCase());
    this.props.dispatch(postsLoaded(posts))
  };

  async componentDidMount() {
    // get posts
    const posts = await getAllPosts(this.state.activeTab);
    this.props.dispatch(postsLoaded(posts));

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

  componentWillReceiveProps(nextProps) {
    const queryParams = queryString.parse(nextProps.location.search)
    if (queryParams.page != undefined) {
      this.setState({
        pageNum: Number(queryParams.page)
      })
    }
  }

  render() {

    let { match } = this.props;

    let tabs = [
      { name: mainTabNames.TOP, link: `/`},
      // { name: mainTabNames.BEST, link: `/best`},
      // { name: mainTabNames.TRENDING, link: `/trending`},
      { name: mainTabNames.NEW, link: `/new`},
      // { name: mainTabNames.CONTROVERSIAL, link: `/controversial`}
    ];

    return (
      <div className='main-container'>
        <SubTab 
          defaultTab={mainTabNames.TOP}
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

        <Pagination pageNum={this.state.pageNum} />
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