import React from 'react';
import TimeEntryListItem from './TimeEntryListItem';
import { Card } from 'antd';

const TimeEntryList = (props) => {
  const { entries } = props
  const timeEntryList = entries.map(entry => {
    return (
      <Card key={entry.id} className="entry">
        <TimeEntryListItem entry={entry}/>
      </Card>
    )
  })
  return timeEntryList;
}
 
export default TimeEntryList;