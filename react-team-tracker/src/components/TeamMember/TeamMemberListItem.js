import React from 'react';

const TeamMemberListItem = (props) => {
  const { first_name, last_name } = props.member
  return (
    <p>{first_name} {last_name}</p>
  );
}
 
export default TeamMemberListItem;