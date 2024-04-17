import React from 'react';
import { List, ListItem, ListItemText, ListItemButton, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const ActivityListItem = ({ schedule, onSelect, onEdit, onDelete, role }) => {
    // Přeformátování datumu a času pro zobrazení
    const formattedStartDate = new Date(schedule.startTime).toLocaleDateString();
    const formattedStartTime = new Date(schedule.startTime).toLocaleTimeString();
    const formattedEndTime = new Date(schedule.endTime).toLocaleTimeString();

    return (
        <ListItem divider>
            <ListItemButton onClick={() => onSelect(schedule.id)} sx={{ flexGrow: 1 }}>
                <ListItemText
                    primary={schedule.name}
                    primaryTypographyProps={{ variant: 'h6' }}
                    secondary={`${formattedStartDate}, ${formattedStartTime} - ${formattedEndTime}`}
                />
            </ListItemButton>
            {role === 'trenér' && (
                <Tooltip title="Editovat">
                    <IconButton onClick={(e) => { e.stopPropagation(); onEdit(schedule.id); }} color="primary">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )}
            {role === 'trenér' && (
                <Tooltip title="Smazat">
                    <IconButton onClick={(e) => { e.stopPropagation(); onDelete(schedule.id); }} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
            <Tooltip title="Rezervovat">
                <IconButton onClick={(e) => { e.stopPropagation(); onSelect(schedule.id); }}>
                    <EventAvailableIcon />
                </IconButton>
            </Tooltip>
        </ListItem>
    );
};

export const ScheduleList = ({ schedules, onSelect, onEdit, onDelete, role }) => {
    return (
        <List sx={{ width: '100%' }}>
            {schedules.map((schedule, index) => (
                <ActivityListItem
                    key={schedule.id || index}
                    schedule={schedule}
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