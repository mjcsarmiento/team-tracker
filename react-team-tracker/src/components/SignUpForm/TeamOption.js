import React, { Component } from 'react';
import axios from 'axios';
import { Select } from 'antd';
const { Option } = Select;

class TeamOption extends Component {
  state = {
    teams: []
  }

  componentDidMount() {
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

  handleChange = (value) => {
    if (value !== '')  {
      this.props.onChange({
        'target': {
          'name': 'team',
          'value': value, 
        }
      })
    }
  }
  
  render() {
    const { teams } = this.state
    const teamList = teams.length ? (
      teams.map(team => {
        return (
          <Option key={team.id} value={team.id}>
            {team.name}
          </Option>
        )
      })
    ) : (null)
    return (
      <Select name="team" onChange={this.handleChange} value={this.props.value} defaultValue={this.props.value}>
         <Option value="">-- Select Team --</Option>
         {teamList}
      </Select>
    )
  }
}

export default TeamOption;