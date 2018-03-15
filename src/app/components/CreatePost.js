import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitPost } from '../api/posts-api';
import TagEditor from './TagEditor';
import Button from './general/Button';
import Form from './general/Form';
import SubTab from './general/SubTab';
import './CreatePost.css';

export const createPostTabNames = {
  "LINK": "Link",
  "TEXT": "Text"
}

class CreatePost extends Component {

  constructor(props) {
    super(props);

    let state = {};
    if (props.location.pathname == '/posts/create/text') {
      state.isText = true;
    }
    else {
      state.isText = false;
    }

    this.state = state;

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleTabSwitch = (tabName) => {
    if (tabName === createPostTabNames.TEXT) {
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
      owner: this.props.owner,
      type: this.state.isText ? 'text' : 'link'
    });
  }

  render() {
    let { match, username } = this.props;

    let tabs = [
      { name: createPostTabNames.LINK, link: '/posts/create', exactPath: true },
      { name: createPostTabNames.TEXT, link: `/posts/create/text` }
    ];

    let inputFields;
    if (this.state.isText === true) {
      inputFields = [
        { name: 'title', type: 'text', label: 'title' },
        { name: 'content', type: 'text', label: 'text' }
      ];
    }
    else {
      inputFields = [
        { name: 'link', type: 'text', label: 'link' },
        { name: 'title', type: 'text', label: 'title' }
      ];
    }

    return (
      <div className='create-post-container'>
        {
          this.props.error !== null
            ?
            <div className='flash-error'>
              {this.props.error}
            </div>
            :
            <div className='flash-error'></div>
        }
        <SubTab
          defaultTab={createPostTabNames.LINK}
          onTabChange={this.handleTabSwitch}
          tabs={tabs} />
        <div className='create-post-main-container'>
          <div className='form-parent-container'>
            <Form
              handleSubmit={this.handleSubmit}
              inputFields={inputFields} />
          </div>
          <div className='tag-editor-parent-container'>
            <TagEditor />
          </div>
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