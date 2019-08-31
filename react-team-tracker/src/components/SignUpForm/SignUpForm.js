import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TeamOption from './TeamOption';
import { Form, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './SignUpForm.css';
import Title from 'antd/lib/typography/Title';

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
        this.props.history.push('/login')
      })
      .catch(error => {
        alert(error.response.data.username)
      })
      .finally(() => {
        this.setToNull()
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
            { first_name && last_name && username && password && team ? (
              <Button htmlType="submit" className="btn-submit">Submit</Button>
            ) : (
              <Button htmlType="submit" className="btn-submit" disabled>Submit</Button>
            )}
          </Form>
        </center>
      </div>
    )
  }
}
 
export default withRouter(SignUpForm);