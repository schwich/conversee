import React, { Component } from 'react';
import {connect} from 'react-redux';
import { submitPost } from '../api/posts-api';
import Button from './Button';
import Form from './Form';
import './CreatePost.css';

class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
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
      })
    }
    else {
      this.setState({
        isText: false,
      })
    }
  }

  async handleSubmit(formValues) {
    const response = await submitPost({
      ...formValues,
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
            <Form
              handleSubmit={this.handleSubmit}
              inputFields={
                [
                  {
                    name: 'title',
                    type: 'text',
                    label: 'title'
                  },
                  {
                    name: 'content',
                    type: 'text',
                    label: 'text'
                  }
                ]
              } 
            />
          :
            <Form
              handleSubmit={this.handleSubmit}
              inputFields={
                [
                  {
                    name: 'link',
                    type: 'text',
                    label: 'link'
                  },
                  {
                    name: 'title',
                    type: 'text',
                    label: 'title'
                  }
                ]
              }
            />
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