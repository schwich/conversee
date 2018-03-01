import React from 'react';
import { PropTypes } from 'prop-types';

export default class CommentReply extends React.Component {

  static propTypes = {
    showByDefault: PropTypes.bool,
    showCancel: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    showCancel: true,
    showByDefault: false
  }

  constructor(props) {
    super(props);

    this.state = {
      replyText: '',
      isReplyExpanded: props.showByDefault ? true : false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.replyText);
    if (!this.state.showByDefault) {
      this.setState({
        isReplyExpanded: false
      })
    }
  }

  render() {
    if (this.state.isReplyExpanded === false ) {
      return null;
    }

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