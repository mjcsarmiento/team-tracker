import React, { Component } from 'react';
import axios from 'axios';
import ProjectOption from './ProjectOption';
import { Form, Input, InputNumber, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const InputGroup = Input.Group;

class TimeEntryForm extends Component {
  state = {
    user: this.props.user.id,
    hours: '',
    project: '',
    task_description: '',
  }

  // sets hours, projects, task_description in state to empty
  setToNull = () => {
    this.setState({
      hours: '',
      project: '',
      task_description: ''
    })
  }

  // updates state by getting name and assigning new value to name
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // updates hours in state by assignin passed value to hours
  handleHoursChange = (value) => {
    this.setState({
      hours: value
    })
  }

  // creates a TimeEntry via POST request
  // result is passed to updateTimeEntryList which will update entries in parent component Home
  // sets values in state to null after
  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/time_entries/api/time_entries/', this.state)
      .then(res => {
        this.props.updateTimeEntryList(res.data)
      })
      .finally(() => {
        this.setToNull()
      })
  }

  render() { 
    const { hours, project, task_description } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup compact>
          <InputNumber
          onChange={this.handleHoursChange}
          min={0}
          placeholder="Number of Hours"
          style={{ width: '30%' }}
          defaultValue={hours}
          value={hours}
          required/>
          <ProjectOption 
            onChange={this.handleChange} 
            value={project} 
            teamId={this.props.user.team}
          />
        </InputGroup>
        <br/>
        <TextArea 
          name="task_description"
          placeholder="Task Description"
          onChange={this.handleChange}
          value={task_description}
          required
        />
        {
          // if hours, project and task_description are not filled up, Submit button will be disabled
          // Submit button will only be activated once hours, project are filled up
          hours && project && task_description ? (
            <Button htmlType="submit" className="btn-submit" align="right">Submit</Button>
          ) : (
            <Button htmlType="submit" className="btn-submit" align="right" disabled>Submit</Button>
          )
        }

      </Form>
    )
  }
}
 
export default TimeEntryForm;