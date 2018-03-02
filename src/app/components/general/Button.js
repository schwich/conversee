import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export default class Button extends React.Component {

  static propTypes = {
    onClickHandler: PropTypes.func,
    type: PropTypes.string
  }

  static defaultProps = {
    type: 'button'
  }

  render() {
    return (
      <button
        className={`btn ${this.props.className}`}
        type={this.props.buttonType}
        onClick={this.props.onClickHandler}>{this.props.children}</button>
    )
  }
}