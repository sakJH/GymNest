import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, Box } from '@mui/material';

const ScheduleDetail = ({ schedule, open, onClose }) => {
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
            <DialogActions>
                <Button onClick={onClose} color="primary">Zavřít</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleDetail;