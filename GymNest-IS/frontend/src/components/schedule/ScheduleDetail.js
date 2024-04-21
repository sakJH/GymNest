import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { AuthContext } from '../AuthContext';

const ScheduleDetail = ({ schedule, open, onClose, onReserve, onEdit, onDelete }) => {
    const { user } = useContext(AuthContext);
    // Formátování datumu a času pro lepší zobrazení
    const formattedStartDate = new Date(schedule.startTime).toLocaleDateString();
    const formattedStartTime = new Date(schedule.startTime).toLocaleTimeString();
    const formattedEndTime = new Date(schedule.endTime).toLocaleTimeString();
    const isReserved = Boolean(schedule.bookingId);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{schedule.name} - Detaily akce</DialogTitle>
            <DialogContent>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>Datum: {formattedStartDate}</Typography>
                    <Typography variant="subtitle1" gutterBottom>Čas: {`${formattedStartTime} - ${formattedEndTime}`}</Typography>
                    <Typography variant="subtitle1" gutterBottom>Typ: {schedule.type}</Typography>
                    <Typography variant="subtitle1" gutterBottom>Trvání: {schedule.duration} minut</Typography>
                    <Typography variant="subtitle1" gutterBottom>Kapacita: {schedule.capacity} lidí</Typography>
                    {schedule.description && (
                        <Typography variant="body1" paragraph>{schedule.description}</Typography>
                    )}
                </Box>
            </DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
                {user && (user.roleId === 3 || user.roleId === 4) && (
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
            </Box>
            <DialogActions>
                <Button onClick={onClose} color="primary">Zavřít</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleDetail;