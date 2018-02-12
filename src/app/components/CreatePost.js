import React, { Component } from 'react';

import { submitPost } from '../api/posts-api';

import './CreatePost.css';

export default class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    title: '',
    content: '',
    link: ''

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    // todo form validation
    const response = await submitPost(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor='link'>Link</label>
          <input
            type="text"
            name="link"
            value={this.state.link}
            onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor='content'>Content</label>
          <input
            type="textarea"
            name="content"
            value={this.state.content}
            onChange={this.handleChange} />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    )
  }
};
