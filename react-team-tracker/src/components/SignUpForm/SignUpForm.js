import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TeamOption from './TeamOption';
import { Form, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './SignUpForm.css';
import Title from 'antd/lib/typography/Title';
import NavBarLink from '../Header/NavBarLink';

class SignUpForm extends Component {
  state = {
    'user': null,
    'first_name': '',
    'last_name': '',
    'username': '',
    'password': '',
    'team': '',
    'image_url': '',
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  // updates user in state by GET request
  getCurrentUser = () => {
    // token is retrieved from localStorage and used to get currently logged in user
    // updates user in state based on the currently logged in user
    // once a user is logged in, it will redirect to Home
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
  }

  // sets first_name, last_name, username, password, team and image_url to null
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

  // updates state by getting name and assigning new value to name
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // creates a CustomUser via POST request
  // redirects to Log In once CustomUser is created
  // returns an error if username already exists
  // sets values in state to null after
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
        this.props.history.push('/login')
      })
      .catch(error => {
        alert(error.response.data.username)
      })
      .finally(() => {
        this.setToNull()
      })
  }

  // if image_url is not empty, it checks first if image_url is a valid image URL
  // it will show an alert if image_url is invalid
  // if image_url empty, it will allow to create a new CustomUser
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
      <div className="signup-container">
        <center>
          <Title level={4}>Registration</Title>
          <Form onSubmit={this.handleSubmit} className="signup-form">
            <Form.Item>
              <Input
              name="first_name"
              placeholder="First Name"
              value={first_name}
              onChange={this.handleChange}
              required
            />
            </Form.Item>
            <Form.Item>
              <Input
                name="last_name"
                placeholder="Last Name"
                value={last_name}
                onChange={this.handleChange}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </Form.Item>
            <Form.Item>
              <TeamOption
                onChange={this.handleChange} 
                value={team}
              />
            </Form.Item>
            <Form.Item>
              <TextArea
                name="image_url"
                placeholder="Image URL"
                value={image_url}
                onChange={this.handleChange}
              />
            </Form.Item>
            {
              // if first_name, last_name, username, password and team are not filled up, Submit button will be disabled
              // Submit button will only be activated once first_name, last_name, username, password and team are filled up
              first_name && last_name && username && password && team ? (
              <Button htmlType="submit" className="btn-submit">Submit</Button>
            ) : (
              <Button htmlType="submit" className="btn-submit" disabled>Submit</Button>
            )}
            <div className="login-link">
              <NavBarLink path="/login" label="Go back to login page"/>
            </div>
          </Form>
        </center>
      </div>
    )
  }
}
 
export default withRouter(SignUpForm);