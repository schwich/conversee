import React, { Component } from 'react';
import { connect } from 'react-redux'
import Content from '../content/Content';
import CreatePost from '../CreatePost';

import { getAllPosts } from '../../api/posts-api';
import { postsLoaded } from '../../redux/actions';

import './Main.css';

class Main extends Component {

  state = {
    posts: null
  }

  async componentDidMount() {
    const posts = await getAllPosts();
    this.props.dispatch(postsLoaded(posts));
  }

  render() {
    return (
      <div className='main-container'>
        {
          this.props.posts.posts !== null
            ?
            this.props.posts.posts.map((post) => {
              return <Content
                key={post.id}
                title={post.title}
                domain={post.link}
                numPoints={post.num_points}
                timestamp={post.created} />
            })
            :
            <div>Loading...</div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(Main)