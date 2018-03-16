import React from 'react';
import Content from '../content/Content';
import Pagination from '../general/Pagination';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getPostsByTag, getMorePostsByTag } from '../../api/tags-api';
import { morePosts } from '../../redux/actions';

import './PostsByTag.css';

class PostsByTag extends React.Component {

  state = {
    posts: null
  }

  constructor(props) {
    super(props);

    this.handleNextPrevPosts = this.handleNextPrevPosts.bind(this);
  }

  async componentDidMount() {
    let page = 1;
    let sortType = 'top';
    if (this.props.match.params.postSortType) {

      sortType = this.props.match.params.postSortType;

      if (this.props.match.params.pageNum) {
        page = this.props.match.params.pageNum;
      }
    }

    const postsByTag = await getPostsByTag(this.props.match.params.tagName);

    this.props.dispatch(morePosts(postsByTag, page, sortType));
  }

  
  async handleNextPrevPosts(nextOrPrev, sortType, pageNum) {

    let page;
    if (nextOrPrev == 'next') {
      page = pageNum + 1;
    }
    else {
      page = pageNum - 1;
    }

    const tagName = this.props.match.params.tagName;
    const posts = await getMorePostsByTag(tagName, sortType, page);
    this.props.dispatch(morePosts(posts, page, sortType));
    this.props.history.push(`/tags/${tagName}/${sortType}/page/${page}`);
  }

  render() {
    return (
      <div className='posts-by-tag-container'>
        <h2 style={{fontWeight: 300}}>Posts tagged with <FontAwesomeIcon icon='tag'/> {this.props.match.params.tagName}</h2>
        <div className='posts-by-tag'>
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
                  content={post.content}
                  numComments={post.num_comments} />
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
    postPageNum: state.posts.pageNum
  }
}

export default connect(mapStateToProps)(PostsByTag);