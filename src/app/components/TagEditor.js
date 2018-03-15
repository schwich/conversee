import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { tagSuggest } from '../api/tags-api';

import './TagEditor.css';

export default class TagEditor extends React.Component {

  state = {
    addTagInput: '',
    suggestions: [],
    chosenTags: {}
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    if (event.target.value == '') {
      this.setState({
        suggestions: []
      })
    }
    else {
      const suggestions = await tagSuggest(event.target.value);
      this.setState({
        suggestions
      })
    }
  }

  chooseTag = (tagId, tagName) => {
    this.setState((prevState) => {
      return {
        chosenTags: {
          ...prevState.chosenTags,
          [tagId]: tagName,
        },

        suggestions: []
      }
    })
  }

  cancelTag = (tagId) => {
    this.setState((prevState) => {
      let chosenTags = { ...prevState.chosenTags };
      delete chosenTags[tagId];
      return {
        chosenTags
      }
    })
  }

  render() {
    return (
      <div className='tag-editor-container'>
        <div className='tag-editor-chosen-tags-container'>
          {
            this.state.chosenTags != null
              ?
              Object.keys(this.state.chosenTags).map(tagId => {
                return (
                  <div
                    className='chosen-tag'
                    key={tagId}>
                    {this.state.chosenTags[tagId]} <span onClick={() => this.cancelTag(tagId)}><FontAwesomeIcon icon='times' /></span>
                  </div>
                )
              })
              :
              null
          }
        </div>
        <div className='tag-editor-input'>
          <label htmlFor='addTagInput'>tags</label>
          <input
            placeholder='add a tag...'
            type='text'
            name='addTagInput'
            value={this.state.addTagInput}
            onChange={this.handleChange} />
        </div>

        <div className='tag-editor-suggestions'>
          {
            this.state.suggestions != null
              ?
              this.state.suggestions.map(suggestion => (
                <div
                  className='tag-suggestion'
                  key={suggestion.id}
                  onClick={() => this.chooseTag(suggestion.id, suggestion.name)}>
                  {suggestion.name}
                </div>
              ))
              :
              null
          }
        </div>
      </div>
    )
  }
}