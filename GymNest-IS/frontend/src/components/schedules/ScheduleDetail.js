// ScheduleDetail.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, Box } from '@mui/material';

const ScheduleDetail = ({ schedule, open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{schedule.eventName} - Detaily akce</DialogTitle>
            <DialogContent>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>{schedule.eventName}</Typography>
                    <Typography variant="subtitle1" gutterBottom>Datum: {new Date(schedule.date).toLocaleDateString()}</Typography>
                    <Typography variant="subtitle1" gutterBottom>Čas: {schedule.time}</Typography>
                    <Typography variant="subtitle1" gutterBottom>Místo: {schedule.location}</Typography>
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
