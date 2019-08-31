import React, { Component } from 'react';
import axios from 'axios';
import ProjectOption from './ProjectOption';

class TimeEntryForm extends Component {
  state = {
    user: this.props.user.id,
    hours: '',
    project: '',
    task_description: '',
  }

  setToNull = () => {
    this.setState({
      hours: '',
      project: '',
      task_description: ''
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/time_entries/api/time_entries/', this.state)
      .then(res => {
        this.setToNull()
        this.props.updateTimeEntryList(res.data)
      })
  }

  render() { 
    const { hours, project, task_description } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="number" min="0" placeholder="Enter # of hours" name="hours" onChange={this.handleChange} value={hours} required/>
        <ProjectOption onChange={this.handleChange} value={project} teamId={this.props.user.team} required/>
        <textarea name="task_description" placeholder="Enter task description" onChange={this.handleChange} value={task_description} required/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
 
export default TimeEntryForm;