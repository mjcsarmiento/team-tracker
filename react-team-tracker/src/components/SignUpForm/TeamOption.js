import React, { Component } from 'react';
import axios from 'axios';

class TeamOption extends Component {
  state = {
    teams: []
  }

  componentDidMount = () => {
    this.getTeams()
  }

  getTeams = () => {
    axios.get('http://localhost:8000/team_projects/api/teams/')
      .then(res => {
        this.setState({
          teams: res.data
        })
      })
  }

  handleChange = (e) => {
    if (e.target.value !== '') {
      this.props.onChange(e)
    }
  }

  render() {
    const { teams } = this.state
    const teamList = teams.length ? (
      teams.map(team => {
        return (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        )
      })
    ) : (null)
    return (
      <select name="team" onChange={this.handleChange} value={this.props.value} required>
        <option value=""> -- Select Team -- </option>
        {teamList}
      </select>
    )
  }
}

export default TeamOption;