import React, { Component } from 'react';
import axios from 'axios';

class ProjectSummary extends Component {
  state = {
    projects: []
  }

  componentDidMount() {
    this.getProjectSummary()
  }

  // updates projects in state by GET request based on passed teamId
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

    // returns Option for every value inside projects
    const projectList = projects.length ? (
      projects.map(project => {
        return (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td align="center">{project.total_hours}</td>
          </tr>
        )
      })
    ) : (null)

    // returns a table with Project and Total Hours as headers with projectList
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