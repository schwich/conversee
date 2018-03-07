import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Button from './Button';

import { Link } from 'react-router-dom';

import './Pagination.css';

export default class Pagination extends React.Component {

  static propTypes = {
    pageNum: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      pageNum: props.pageNum
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pageNum: nextProps.pageNum
    })
  }

  render() {
    let num = this.props.pageNum;
    let showPrev = this.props.showPrev;
    if (this.props.pageNum === 1) {
      showPrev = false;
    }
    else {
      showPrev = true;
    }

    return (
      <div className='pagination'>
      {
        showPrev === true 
        &&
        <Link to={`?page=${this.state.pageNum - 1}`}>
          <Button><FontAwesomeIcon icon='angle-left' /> Prev</Button>
        </Link>
      }
        <Link to={`?page=${this.state.pageNum + 1}`}>
          <Button>Next <FontAwesomeIcon icon='angle-right' /></Button>
        </Link>
      </div>
    );
  }
}