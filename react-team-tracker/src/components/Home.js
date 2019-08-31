import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TimeEntryList from './Home/TimeEntryList';
import ProjectSummary from './Home/ProjectSummary';
import TimeEntryForm from './Home/TimeEntryForm';

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

  updateTimeEntryList = (newEntry) => {
    this.setState({
      entries: [newEntry, ...this.state.entries]
    })
  }

  renderHomeComponents = () => {
    return (
      <div>
        <TimeEntryForm user={this.state.user} updateTimeEntryList={this.updateTimeEntryList}/>
        <TimeEntryList entries={this.state.entries}/>
        <ProjectSummary teamId={this.state.user.team}/>
        <button onClick={this.logOutUser}>Logout</button>
      </div>
    )
  }

  logOutUser = () => {
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  render() {
    return (
      <Fragment>
        { this.state.user ? (this.renderHomeComponents()) : (null) }
      </Fragment>
    );
  }
}
 
export default withRouter(Home);