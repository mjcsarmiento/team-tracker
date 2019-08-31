import React, { Component } from 'react';
import axios from 'axios';

class ProjectSummary extends Component {
  state = {
    projects: []
  }

  componentDidMount() {
    this.getProjectSummary()
  }

  getProjectSummary = () => {
    axios.get('http://localhost:8000/team_projects/api/projects/?team=' + this.props.teamId)
      .then(res => {
        this.setState({
          projects: res.data
        })
      })
  }

  render() { 
    const { projects } = this.state
    const projectList = projects.length ? (
      projects.map(project => {
        return (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.total_hours}</td>
          </tr>
        )
      })
    ) : (null)
    return (
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {projectList}
        </tbody>
      </table>
    )
  }
}
 
export default ProjectSummary;