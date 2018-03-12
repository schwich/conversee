import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Button from './Button';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Pagination.css';

class Pagination extends React.Component {

  static propTypes = {
    onMore: PropTypes.func.isRequired
  }

  handleOnMore = (prevOrNext) => {
    
    this.props.onMore(prevOrNext, this.props.sortType, this.props.pageNum);
  }

  render() {

    let showPrev = true;
    if (this.props.pageNum == 1) {
      showPrev = false;
    }

    return (
      <div className='pagination'>
      {
       showPrev === true 
        &&

          <Button onClickHandler={() => {this.handleOnMore('prev')}}><FontAwesomeIcon icon='angle-left' /> Prev</Button>

      }
          <Button onClickHandler={() => {this.handleOnMore('next')}}>Next <FontAwesomeIcon icon='angle-right' /></Button>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pageNum: state.posts.pageNum,
    sortType: state.posts.sortType
  }
}

export default connect(mapStateToProps)(Pagination);