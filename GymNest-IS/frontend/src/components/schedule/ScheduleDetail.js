import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, Box, IconButton, Tooltip } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { AuthContext } from '../AuthContext';

const ScheduleDetail = ({ schedule, open, onClose, onReserve }) => {
    const { user } = useContext(AuthContext);
    // Formátování datumu a času pro lepší zobrazení
    const formattedStartDate = new Date(schedule.startTime).toLocaleDateString();
    const formattedStartTime = new Date(schedule.startTime).toLocaleTimeString();
    const formattedEndTime = new Date(schedule.endTime).toLocaleTimeString();

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{schedule.name} - Detaily akce</DialogTitle>
            <DialogContent>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>Datum: {formattedStartDate}</Typography>
                    <Typography variant="subtitle1" gutterBottom>Čas: {`${formattedStartTime} - ${formattedEndTime}`}</Typography>
                    <Typography variant="subtitle1" gutterBottom>Typ: {schedule.type}</Typography>
                    <Typography variant="subtitle1" gutterBottom>Trvání: {schedule.duration} minut</Typography>
                    {schedule.description && (
                        <Typography variant="body1" paragraph>{schedule.description}</Typography>
                    )}
                </Box>
            </DialogContent>
            {user && (
                <Tooltip title="Rezervovat">
                    <IconButton onClick={(e) => { e.stopPropagation(); onReserve(schedule.activityId, schedule.id); }}>
                        <EventAvailableIcon />
                    </IconButton>
                </Tooltip>
            )}
            <DialogActions>
                <Button onClick={onClose} color="primary">Zavřít</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleDetail;