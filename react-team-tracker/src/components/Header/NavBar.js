import React, { Component } from 'react';
import NavBarLink from './NavBarLink';
import { withRouter } from 'react-router-dom';

class NavBar extends Component {
  logOutUser = () => {
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  render() { 
    return (
      <div>
        <NavBarLink path="/" label="Home"/>
        <NavBarLink path="/team" label="Team Members"/>
        <button onClick={this.logOutUser}>Logout</button>
      </div>
    );
  }
}
 
export default withRouter(NavBar);