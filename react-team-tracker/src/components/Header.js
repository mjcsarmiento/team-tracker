import React, { Fragment } from 'react';
import NavBar from './Header/NavBar';

const Header = () => {
  return (
    <Fragment>
      <h1>Team Tracker</h1>
      <sub>Keep track of your team's progress</sub>
      <NavBar/>
    </Fragment>
  );
}
 
export default Header;