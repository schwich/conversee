import React from 'react';
import PropTypes from 'prop-types';
import Ink from 'react-ink';

import './Button.css';

export default class Button extends React.Component {

  static propTypes = {
    onClickHandler: PropTypes.func,
    type: PropTypes.string,
    showLoading: PropTypes.bool
  }

  static defaultProps = {
    type: 'button'
  }

  render() {
    return (
      <button
        className={`btn ${this.props.className}`}
        style={{ position: 'relative' }}
        type={this.props.buttonType}
        onClick={this.props.onClickHandler}>
        <Ink />
        {this.props.children}
      </button>
    )
  }
}