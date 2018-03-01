import React from 'react';
import { PropTypes } from 'prop-types';

export default class CommentReply extends React.Component {

  state = {
    replyText: '',
    isReplyExpanded: false
  }

  static propTypes = {
    showCancel: PropTypes.bool
  }

  static defaultProps = {
    showCancel: true
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      isReplyExpanded: false
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type='text'
            name='replyText'
            value={this.state.replyText}
            onChange={this.handleChange}
            required
          />
        </div>
        <button type='submit'>submit</button>
        {
          this.props.showCancel === true
            ?
            <button onClick={this.props.onCancel}>cancel</button>
            :
            null
        }
      </form>
    )
  }
}