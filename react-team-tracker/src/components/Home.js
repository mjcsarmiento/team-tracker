import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TimeEntryList from './Home/TimeEntryList';
import ProjectSummary from './Home/ProjectSummary';
import TimeEntryForm from './Home/TimeEntryForm';
import './Home.css';
import Title from 'antd/lib/typography/Title';
import { Card } from 'antd';

class Home extends Component {
  state = {
    user: null,
    entries: []
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  // updates user in state by GET request
  getCurrentUser = () => {
    // token is retrieved from localStorage and used to get currently logged in user
    // updates user in state based on the currently logged in user
    // updates entries using getTimeEntryList
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
    // redirects to Log In page if there is no token in localStorage
    else {
      this.props.history.push('/login')
    }
  }

  // updates entries in state by GET request based on passed teamId
  getTimeEntryList = (teamId) => {
    axios.get('http://localhost:8000/team_projects/api/teams/' + teamId)
      .then(res => {
        this.setState({
          entries: res.data.recent_time_entries
        })
      })
  }

  // updates entries in state by adding the passed newEntry to entries
  updateTimeEntryList = (newEntry) => {
    this.setState({
      entries: [newEntry, ...this.state.entries]
    })
  }

  renderHomeComponents = () => {
    return (
      <div className="home">
        <div className="home-left">
          <Card className="entry-form">
            <img src={this.state.user.image_url} align="left" alt="profile"/><Title level={2} className="user-name">{this.state.user.first_name} {this.state.user.last_name}</Title>
            <Title level={4} style={{ marginBottom: '20px' }}>Accomplishment for today:</Title>
            <TimeEntryForm user={this.state.user} updateTimeEntryList={this.updateTimeEntryList}/>
          </Card>
          <TimeEntryList entries={this.state.entries}/>
        </div>
        <div className="home-right">
          <Title level={3}>Project Summary</Title>
          <ProjectSummary teamId={this.state.user.team}/>
        </div>
      </div>
    )
  }

  // will only return renderHomeComponents() if user and project in state are not empty
  render() {
    return (
      <Fragment>
        { this.state.user ? (this.renderHomeComponents()) : (null) }
      </Fragment>
    );
  }
}
 
export default withRouter(Home);