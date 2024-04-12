// ScheduleList.js
import React from 'react';
import { List, ListItem, ListItemText, ListItemButton, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const ActivityListItem = ({ activity, onSelect, onEdit, onDelete, role }) => {
    return (
        <ListItem divider>
            <ListItemButton onClick={() => onSelect(activity.id)} sx={{ flexGrow: 1 }}>
                <ListItemText
                    primary={activity.name}
                    primaryTypographyProps={{ variant: 'h6' }}
                    secondary={`${new Date(activity.date).toLocaleDateString()} - ${activity.time}`}
                />
            </ListItemButton>
            {role === 'trenér' && (
                <Tooltip title="Editovat">
                    <IconButton onClick={(e) => { e.stopPropagation(); onEdit(activity.id); }} color="primary">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )}
            {role === 'trenér' && (
                <Tooltip title="Smazat">
                    <IconButton onClick={(e) => { e.stopPropagation(); onDelete(activity.id); }} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
            <Tooltip title="Rezervovat">
                <IconButton onClick={(e) => { e.stopPropagation(); onSelect(activity.id); }}>
                    <EventAvailableIcon />
                </IconButton>
            </Tooltip>
        </ListItem>
    );
};

export const ScheduleList = ({ schedules, onSelect, onEdit, onDelete, role }) => {
    return (
        <List sx={{ width: '100%' }}>
            {schedules.map(activity => (
                <ActivityListItem
                    key={activity.id}
                    activity={activity}
                    onSelect={onSelect}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    role={role}
                />
            ))}
        </List>
    );
};

export default ScheduleList;
