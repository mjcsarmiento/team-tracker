import React, { Component } from 'react';
import NavBarLink from './NavBarLink';
import { withRouter } from 'react-router-dom';

class NavBar extends Component {
  // removes token in localStorage and redirects to Log In page
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