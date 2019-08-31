import React from 'react';
import NavBar from './Header/NavBar';
import Title from 'antd/lib/typography/Title';
import './Header.css';

const Header = () => {
  return (
    <div className="navigation">
      <Title className="header"><div className="team-header">Team</div> Tracker</Title>
      <p className="phrase">keep track of your team's progress</p>
      <NavBar/>
    </div>
  );
}
 
export default Header;