import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export default class Button extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <button className='btn'>{this.props.text}</button>
    )
  }
}