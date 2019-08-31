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

  render() {
    return (
      <Fragment>
        { this.state.user ? (this.renderHomeComponents()) : (null) }
      </Fragment>
    );
  }
}
 
export default withRouter(Home);