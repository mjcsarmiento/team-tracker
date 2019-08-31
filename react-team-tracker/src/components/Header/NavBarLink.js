import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBarLink = (props) => {
  const { path, label } = props
  return (
    <NavLink to={path}>{label}</NavLink>
  );
}
 
export default NavBarLink;