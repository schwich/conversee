import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../general/Button';

import './CommentReply.css';

export default class CommentReply extends React.Component {

  static propTypes = {
    showCancel: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    showCancel: true,
    height: 4,
    width: 80
  }

  constructor(props) {
    super(props);

    this.state = {
      replyText: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.replyText, this.props.idx);
    if (!this.state.showByDefault) {
      this.setState({
        isReplyExpanded: false,
        replyText: ''
      })
    }
    else {
      this.setState({
        replyText: ''
      })
    }
  }

  render() {
    if (this.props.isShowing === false) {
      return null;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <textarea
            rows={this.props.height}
            cols={this.props.width}
            type='text'
            name='replyText'
            value={this.state.replyText}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className='comment-reply-button-panel'>
          <Button type='submit'>submit</Button>
          {
            this.props.showCancel === true
              ?
              <Button buttonType='button' onClickHandler={this.props.onCancel}>cancel</Button>
              :
              null
          }
        </div>

      </form>
    )
  }
}