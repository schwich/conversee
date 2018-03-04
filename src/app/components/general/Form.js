import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import './Form.css';

// todo expose a form validation interface
export default class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    // initialize all input values to the empty string
    props.inputFields.map(inputElement => {
      this.state[inputElement.name] = '';
    })
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    inputFields: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      label: PropTypes.string.isRequired,
      required: PropTypes.bool
    })).isRequired
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  /**
   * Form's handleSubmit will prevent the event from propagating and then pass the value of the state
   *  (which is set from the array of input values passed in) to its parent
   */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  }

  render() {

    return (
      <form
        className='form'
        onSubmit={this.handleSubmit}>
        {
          this.props.inputFields.map(inputElement => {
            return (
              <div
                className='form-item-container'
                key={inputElement.name}>
                <label htmlFor={inputElement.name}>{inputElement.label}</label>
                <input
                  type={inputElement.type}
                  name={inputElement.name}
                  value={this.state[inputElement.name]}
                  onChange={this.handleChange}
                  required={inputElement.required}
                />
              </div>
            )
          })
        }
        <Button type='submit'>submit</Button>
      </form>
    )
  }
}