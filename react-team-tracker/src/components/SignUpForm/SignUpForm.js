import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TeamOption from './TeamOption';

class SignUpForm extends Component {
  state = {
    'first_name': '',
    'last_name': '',
    'username': '',
    'password': '',
    'team': '',
    'image_url': '',
  }

  setToNull = () => {
    this.setState({
      'first_name': '',
      'last_name': '',
      'username': '',
      'password': '',
      'team': '',
      'image_url': '',
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  registerUser = (hasImage) => {
    const data = {
      'first_name': this.state.first_name,
      'last_name': this.state.last_name,
      'username': this.state.username,
      'password': this.state.password,
      'team': this.state.team,
    }

    axios.post('http://localhost:8000/users/register/', 
      hasImage ? (
        {'image_url': this.state.image_url, ...data}
      ) : (data)
    )
      .then(res => {
        this.setToNull()
        this.props.history.push('/login')
      })
      .catch(error => {
        alert(error.response.data.username)
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.image_url) {
      const isImageUrl = require('is-image-url')
      if (isImageUrl(this.state.image_url)) {
        this.registerUser(true)
      }
      else {
        alert('Invalid image URL!')
      }
    }
    else {
      this.registerUser(false)
    }
  }

  render() {
    const { first_name, last_name, username, password, team, image_url } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" value={first_name} onChange={this.handleChange} required/>
        <input type="text" name="last_name" placeholder="Last Name" value={last_name} onChange={this.handleChange} required/>
        <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} required/>
        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} required/>
        <TeamOption onChange={this.handleChange} value={team}/>
        <textarea name="image_url" placeholder="Image URL" onChange={this.handleChange} value={image_url}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
 
export default withRouter(SignUpForm);