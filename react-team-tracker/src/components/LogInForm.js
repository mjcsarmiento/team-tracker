import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class LogInForm extends Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/token/', this.state)
      .then(res => {
        localStorage.setItem('token', res.data.access)
        this.props.history.push('/')
      })
      .catch(error => {
        alert('Incorrect username and/or password!')
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" onChange={this.handleChange}/>
        <input type="password" name="password" onChange={this.handleChange}/>
        <button type="submit">Log In</button>
      </form>
    );
  }
}
 
export default withRouter(LogInForm);