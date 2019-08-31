import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TimeEntryList from './TimeEntryList';


class Home extends Component {
  state = {
    user: null,
    entries: []
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
            this.getTimeEntryList(this.state.user.team)
          })
        })
    }
    else {
      this.props.history.push('/login')
    }
  }

  getTimeEntryList = (teamId) => {
    axios.get('http://localhost:8000/team_projects/api/teams/' + teamId)
      .then(res => {
        this.setState({
          entries: res.data.recent_time_entries
        })
      })
  }

  logOutUser = () => {
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        { this.state.entries ? (
          <TimeEntryList entries={this.state.entries}/>
        ) : (null) }
        <button onClick={this.logOutUser}>Logout</button>
      </div>
    );
  }
}
 
export default withRouter(Home);