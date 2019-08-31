import React, { Component } from 'react';
import axios from 'axios';
import { Select } from 'antd';
const { Option } = Select;

class ProjectOption extends Component {
  state = {
    projects: []
  }

  componentDidMount = () => {
    this.getTeamProjects()
  }

  getTeamProjects = () => {
    axios.get('http://localhost:8000/team_projects/api/teams/' + this.props.teamId)
      .then(res => {
        this.setState({
          projects: res.data.team_projects
        })
      })
  }

  handleChange = (value) => {
    if (value !== '')  {
      this.props.onChange({
        'target': {
          'name': 'project',
          'value': value, 
        }
      })
    }
  }

  render() {
    const { projects } = this.state
    const projectList = projects.length ? (
      projects.map(project => {
        return (
          <Option key={project.id} value={project.id}>
            {project.name}
          </Option>
        )
      })
    ) : (null)
    return (
      <Select name="project" onChange={this.handleChange} defaultValue={this.props.value} style={{ width: '70%' }}>
        <Option value="">-- Select Project --</Option>
        {projectList}
      </Select>
    )
  }
}

export default ProjectOption