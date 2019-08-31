import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, Input, Icon, Button } from 'antd';
import './LogInForm.css';
import Title from 'antd/lib/typography/Title';
import NavBarLink from './Header/NavBarLink';

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
      <div className="login-container">
        <center>
          <Title level={4}>Welcome!</Title>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <Input
                name="username"
                placeholder="Username"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                onChange={this.handleChange}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                name="password"
                placeholder="Password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                onChange={this.handleChange}
                required
              />
            </Form.Item>
            <Button htmlType="submit" className="btn-submit">Log In</Button>
            <div className="registration-link">
              No account yet? <NavBarLink path="/register" label="Register now!"/>
            </div>
          </Form>
        </center>
      </div>
    );
  }
}
 
export default withRouter(LogInForm);