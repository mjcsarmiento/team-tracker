import React, { Component, Fragment } from 'react';
import axios from 'axios';
import TeamMemberListItem from './TeamMemberListItem';
import './TeamMember.css';

class TeamMemberList extends Component {
  state = {
    user: null,
    members: []
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  getTeamMembers = (teamId) => {
    axios.get('http://localhost:8000/users/api/users/?team=' + teamId)
      .then(res => {
        this.setState({
          members: res.data
        })
      })
  }

  getCurrentUser = () => {
    const token = localStorage.getItem('token')
    if (token) {
      const headers = {'Authorization': 'Bearer ' + token}
      axios.get('http://localhost:8000/users/current/', {'headers': headers})
        .then(res => {
          this.setState({
            user: res.data
          }, () => {
            this.getTeamMembers(this.state.user.team)
          })
        })
    }
    else {
      this.props.history.push('/login')
    }
  }

  renderTeamMemberListComponents = () => {
    const { members } = this.state
    const memberList = members.length ? (
      members.map(member => {
        return (
          <TeamMemberListItem key={member.id} member={member}/>
        )
      })
    ): (null)
    return (
      <div className="profiles">{memberList}</div>
    )
  }

  render() { 
    return (
      <Fragment>
        { this.state.user ? (this.renderTeamMemberListComponents()) : (null) }
      </Fragment>
    );
  }
}
 
export default TeamMemberList;