import React from 'react';
import NavBarLink from './NavBarLink';

const NavBar = () => {
  return (
    <div>
      <NavBarLink path="/" label="Home"/>
      <NavBarLink path="/team" label="Team Members"/>
    </div>
  );
}
 
export default NavBar;