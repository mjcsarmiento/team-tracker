import React from 'react';
import TimeEntryListItem from './TimeEntryListItem';

const TimeEntryList = (props) => {
  const { entries } = props
  const timeEntryList = entries.map(entry => {
    return (
      <TimeEntryListItem key={entry.id} entry={entry}/>
    )
  })
  return timeEntryList;
}
 
export default TimeEntryList;