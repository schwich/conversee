import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

export default class Input extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isRequired: PropTypes.bool,
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    validationErrorMessage: PropTypes.string,
    noAutoComplete: PropTypes.bool
  }

  static defaultProps = {
    isValue: false,
    isInvalid: false,
    noAutoComplete: false
  }

  render() {

    let validationClass;
    if (this.props.isValid) {
      validationClass = 'valid'
    }
    else if (this.props.isInvalid) {
      validationClass = 'invalid'
    }
    else {
      validationClass = '';
    }

    let inputField;
    switch(this.props.type) {

      case 'textarea':
        inputField = <textarea
        className={`form-group-input ${validationClass}`}
        value={this.props.inputValue}
        onChange={this.props.onChange}
        name={this.props.name}>
          {this.props.inputValue}
        </textarea>
      break;

      case 'text':
      default:
        inputField = <input
        autoComplete={this.props.noAutoComplete ? 'off' : 'on'}
        className={`form-group-input ${validationClass}`}
        type={this.props.type}
        value={this.props.inputValue}
        onChange={this.props.onChange}
        name={this.props.name} />
    }

    return (
      <div className='form-group'>
        <label 
          htmlFor={this.props.name}
          className='form-group-label'>
          {this.props.labelText}
        </label>
        {
          inputField
        }
        {
          this.props.validationError
          ? 
          <div>
            {this.props.validationErrorMessage}
          </div>
          :
          null
        }
      </div>
    );
  }
}