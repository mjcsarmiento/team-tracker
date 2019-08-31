import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class Home extends Component {
  state = {
    user: null
  }

  componentDidMount = () => {
    this.getCurrentUser()
  }

  getCurrentUser = () => {
    const token = localStorage.getItem('token')
    if (token) {
      const headers = {'Authorization': 'Bearer ' + token}
      console.log(headers)
      axios.get('http://localhost:8000/users/current/', {'headers': headers})
        .then(res => {
          this.setState({
            user: res.data
          })
        })
    }
    else {
      this.props.history.push('/login')
    }
  }

  logOutUser = () => {
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <button onClick={this.logOutUser}>Logout</button>
      </div>
    );
  }
}
 
export default withRouter(Home);