import React, { Component } from 'react';

import Content from '../content/Content';
import CreatePost from '../CreatePost';

import { getAllPosts } from '../../api/posts-api';

export default class Main extends Component {

  state = {
    posts: null
  }

  async componentDidMount() {
    const posts = await getAllPosts();
    this.setState(() => ({ posts }));
  }

  render() {
    return (
      <div className='container'>
        {
          this.state.posts !== null
            ?
            this.state.posts.map((post) => {
              return <Content
                title={post.title}
                domain={post.domain_name}
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