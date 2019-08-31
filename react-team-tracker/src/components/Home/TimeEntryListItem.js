import React, { Component } from 'react';
import axios from 'axios';
import { Icon } from 'antd';

class TimeEntryListItem extends Component {
  state = {
    user: null,
    project: null,
  }

  componentDidMount() {
    this.getUser(this.props.entry.user)
    this.getProject(this.props.entry.project)
  }

  getUser = (userId) => {
    axios.get('http://localhost:8000/users/api/users/' + userId)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
  }

  getProject = (projectId) => {
    axios.get('http://localhost:8000/team_projects/api/projects/' + projectId)
      .then(res => {
        this.setState({
          project: res.data
        })
      })
  }

  renderComponent = () => {
    const { time_in, hours, task_description } = this.props.entry
    const { user, project } = this.state
    const dateTime = new Date(time_in)
    const hoursLbl = hours > 1 ? ('hours') : ('hour')
    return (
      <div className="entry-item">
        <img src={user.image_url} align="left" alt="profile"/>
        <p className="name">{user.first_name} {user.last_name}</p>
        <p><Icon type="calendar" /> {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}</p>
        <div className="hours-projects">
          <div className="hours">
            <Icon type="clock-circle" className="icon"/> {hours} {hoursLbl}
          </div>
          <div className="projects">
            <Icon type="project" className="icon"/> {project.name}
          </div>
        </div>
        {task_description}
      </div>
    );
  }

  render() {
    return this.state.user && this.state.project ? (this.renderComponent()) : (null)
  }
}
 
export default TimeEntryListItem;