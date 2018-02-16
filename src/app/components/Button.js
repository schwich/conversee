import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export default class Button extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func
  }

  render() {
    return (
      <button
       className='btn'
       onClick={this.props.onClickHandler}>{this.props.text}</button>
    )
  }
}