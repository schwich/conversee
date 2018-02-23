import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export default class Button extends React.Component {

  static propTypes = {
    onClickHandler: PropTypes.func
  }

  render() {
    return (
      <button
       className='btn'
       onClick={this.props.onClickHandler}>{this.props.children}</button>
    )
  }
}