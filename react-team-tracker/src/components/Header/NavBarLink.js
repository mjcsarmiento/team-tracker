import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBarLink = (props) => {
  // receives props to be used for path and label for NavLink
  const { path, label } = props
  return (
    <NavLink to={path}>{label}</NavLink>
  );
}
 
export default NavBarLink;