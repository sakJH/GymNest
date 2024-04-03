import React from 'react';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';

const ScheduleList = ({ schedules, onSelect }) => {
    return (
        <List>
            {schedules.map(schedule => (
                <ListItem key={schedule.id} disablePadding>
                    <ListItemButton onClick={() => onSelect(schedule.id)}>
                        <ListItemText primary={schedule.eventName} secondary={`${schedule.date} at ${schedule.time}`} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default ScheduleList;
