import React from 'react';
import Title from 'antd/lib/typography/Title';

const TeamMemberListItem = (props) => {
  const { first_name, last_name, image_url, username } = props.member
  return (
    <div className="user-profile">
      <img src={image_url} alt="profile"/>
      <Title level={4}>{first_name} {last_name}</Title>
      <p>{username}</p>
    </div>
  );
}
 
export default TeamMemberListItem;