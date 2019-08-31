import React, { Component } from 'react';
import axios from 'axios';


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

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.props.onChange(e)
    }
  }

  render() {
    const { projects } = this.state
    const projectList = projects.length ? (
      projects.map(project => {
        return (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        )
      })
    ) : (null)
    return (
      <select name="project" onChange={this.handleChange} value={this.props.value}>
        <option value=""> -- Select Project -- </option>
        {projectList}
      </select>
    )
  }
}

export default ProjectOption