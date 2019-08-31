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

  // updates members in state by GET request based on passed teamId
  getTeamMembers = (teamId) => {
    axios.get('http://localhost:8000/users/api/users/?team=' + teamId)
      .then(res => {
        this.setState({
          members: res.data
        })
      })
  }

  // updates user in state by GET request
  getCurrentUser = () => {
    // token is retrieved from localStorage and used to get currently logged in user
    // updates user in state based on the currently logged in user
    // once a user is logged in, it will redirect to Home
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
    // redirects to Log In page if there is no token in localStorage
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

  // will only return renderTeamMemberListComponents() if user and project in state are not empty
  render() { 
    return (
      <Fragment>
        { this.state.user ? (this.renderTeamMemberListComponents()) : (null) }
      </Fragment>
    );
  }
}
 
export default TeamMemberList;