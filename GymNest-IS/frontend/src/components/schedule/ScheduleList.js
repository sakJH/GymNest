import React, { useContext } from 'react';
import { List, ListItem, ListItemText, ListItemButton, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { AuthContext } from '../AuthContext';

const ActivityListItem = ({ schedule, onSelect, onEdit, onDelete, onReserve }) => {
    const { user } = useContext(AuthContext);
    // Přeformátování datumu a času pro zobrazení
    const formattedStartDate = new Date(schedule.startTime).toLocaleDateString();
    const formattedStartTime = new Date(schedule.startTime).toLocaleTimeString();
    const formattedEndTime = new Date(schedule.endTime).toLocaleTimeString();
    const isReserved = Boolean(schedule.bookingId);

    return (
        <ListItem divider>
            <ListItemButton onClick={() => onSelect(schedule.id)} sx={{ flexGrow: 1 }}>
                <ListItemText
                    primary={schedule.name}
                    primaryTypographyProps={{ variant: 'h6' }}
                    secondary={`${formattedStartDate}, ${formattedStartTime} - ${formattedEndTime}`}
                />
            </ListItemButton>
            {(user && (user.roleId === 3 || user.roleId === 4)) && (
                <>
                <Tooltip title="Editovat">
                    <IconButton onClick={(e) => { e.stopPropagation(); onEdit(schedule.id); }} color="primary">
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Smazat">
                    <IconButton onClick={(e) => { e.stopPropagation(); onDelete(schedule.id); }} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                </>
            )}
            {user && (
                <Tooltip title={isReserved ? "Zrušit rezervaci" : "Rezervovat"}>
                    <IconButton onClick={(e) => { e.stopPropagation(); onReserve(schedule.activityId, schedule.id); }}>
                        {isReserved ? <EventBusyIcon /> : <EventAvailableIcon />}
                    </IconButton>
                </Tooltip>
            )}
        </ListItem>
    );
};

export const ScheduleList = ({ schedules, onSelect, onEdit, onDelete, role, onReserve }) => {
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
                    onReserve={onReserve}
                />
            ))}
        </List>
    );
};

export default ScheduleList;