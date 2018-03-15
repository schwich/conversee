import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Input from './general/Input';
import ListGroup from './general/ListGroup';
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
    
    let suggestions = []
    if (this.state.suggestions != null ) {
      this.state.suggestions.map(suggestion => {
        suggestions.push({
          key: suggestion.id,
          listText: suggestion.name,
          onClick: () => this.chooseTag(suggestion.id, suggestion.name)
        })
      })
    }

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
          <Input
            noAutoComplete
            name='addTagInput'
            type='text'
            labelText='tags'
            onChange={this.handleChange}
            value={this.state.addTagInput} />
        </div>

        <div className='tag-editor-suggestions'>
          {
            suggestions != null
              ?
              <ListGroup list={suggestions} />
              :
              null
          }
        </div>
      </div>
    )
  }
}