import React, { Component } from 'react';
import axios from 'axios';

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
    return (
      <div>
        <p>{time_in}</p>
        <p>{hours}</p>
        <p>{user.first_name} {user.last_name}</p>
        <p>{project.name}</p>
        <p>{task_description}</p>
      </div>
    );
  }

  render() {
    return this.state.user && this.state.project ? (this.renderComponent()) : (null)
  }
}
 
export default TimeEntryListItem;