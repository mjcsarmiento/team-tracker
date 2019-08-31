import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class LogInForm extends Component {
  state = {
    user: null,
    username: '',
    password: '',
  }

  componentDidMount = () => {
    this.getCurrentUser()
  }

  getCurrentUser = () => {
    const token = localStorage.getItem('token')
    if (token) {
      const headers = {'Authorization': 'Bearer ' + token}
      axios.get('http://localhost:8000/users/current/', {'headers': headers})
        .then(res => {
          this.setState({
            user: res.data
          }, () => {
            this.props.history.push('/')
          })
        })
    }
    else {
      this.props.history.push('/login')
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { username, password } = this.state
    axios.post('http://localhost:8000/api/token/', {'username': username, 'password': password})
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