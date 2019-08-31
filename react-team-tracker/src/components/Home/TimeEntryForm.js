import React, { Component } from 'react';
import axios from 'axios';
import ProjectOption from './ProjectOption';
import { Form, Input, InputNumber, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const InputGroup = Input.Group;

class TimeEntryForm extends Component {
  state = {
    user: this.props.user.id,
    hours: 0,
    project: '',
    task_description: '',
  }

  setToNull = () => {
    this.setState({
      hours: 0,
      project: '',
      task_description: ''
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleHoursChange = (value) => {
    this.setState({
      hours: value
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
    const { project, task_description } = this.state
    return (
      <Form>
        <InputGroup compact>
          <InputNumber
          onChange={this.handleHoursChange}
          min={0}
          placeholder="Number of Hours"
          style={{ width: '30%' }}
          required/>
          <ProjectOption 
            onChange={this.handleChange} 
            value={project} 
            teamId={this.props.user.team} 
            required
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
        <Button type="submit" className="btn-submit" align="right">Submit</Button>
      </Form>
    )
  }
}
 
export default TimeEntryForm;