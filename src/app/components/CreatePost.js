import React, { Component } from 'react';
import {connect} from 'react-redux';
import { submitPost } from '../api/posts-api';

import './CreatePost.css';

class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    title: '',
    content: '',
    link: '',
    isText: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleTabSwitch = (tabName) => {
    if (tabName === 'textTab') {
      this.setState({
        isText: true,
        content: ''
      })
    }
    else {
      this.setState({
        isText: false,
        link: ''
      })
    }
  }

  async handleSubmit(event) {
    event.preventDefault();


    // todo form validation


    const response = await submitPost({
      ...this.state,
      owner: this.props.owner
    });
  }

  render() {
    return (
      <div>
        {
          this.props.error !== null 
          ?
            <div className='flash-error'>
              {this.props.error}
            </div>
          : 
            <div className='flash-error'></div>
        }
        <div className='create-post-switcher'>
          <ul className='horizontal-tab-bar'>
            <li
              className={this.state.isText === false ? 'active-tab' : ''}
              onClick={() => this.handleTabSwitch('linkTab')}>
              Link
            </li>
            <li
              className={this.state.isText === true ? 'active-tab' : ''}
              onClick={() => this.handleTabSwitch('textTab')}>
              Text
            </li>
          </ul>
        </div>
        <div className='form-container'>
        {
          this.state.isText === true 
          ?
            <form onSubmit={this.handleSubmit}>
              <div className='form-item-container'>
                <label htmlFor='title'>title</label>
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange} />
              </div>
              <div className='form-item-container'>
                <label htmlFor='content'>text</label>
                <textarea
                  type="text"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleChange} />
              </div>
              <div>
                <input type="submit" value="Submit" />
              </div>
            </form>
          :
            <form onSubmit={this.handleSubmit}>
              <div className='form-item-container'>
                <label htmlFor='link'>url</label>
                <input
                  type="text"
                  name="link"
                  value={this.state.link}
                  onChange={this.handleChange} />
              </div>
              <div className='form-item-container'>
                <label htmlFor='title'>title</label>
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange} />
              </div>
              <div>
                <input type="submit" value="Submit" />
              </div>
            </form>
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    owner: state.user.uid,
    error: state.posts.error
  }
}

export default connect(mapStateToProps)(CreatePost)