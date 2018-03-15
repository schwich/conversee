import React from 'react';
import PropTypes from 'prop-types';

import './ListGroup.css';

export default class ListGroup extends React.Component {

  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.number,
      listText: PropTypes.string.isRequired,
      onClick: PropTypes.func
    })).isRequired
  }

  render() {
    return (
      <div className='list-group-container'>
        {
          this.props.list != null 
          ?
            this.props.list.map(item => {
              return (
                <button
                key={item.key}
                type='button'
                className='list-group-item'
                onClick={item.onClick}>
                {item.listText}
              </button>
              )
            })
          : 
            null
        }
      </div>
    );
  }
}