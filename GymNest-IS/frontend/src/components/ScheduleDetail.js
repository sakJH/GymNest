import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@mui/material';

const ScheduleDetail = ({ schedule, open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Rozvrh Detail</DialogTitle>
            <DialogContent>
                <Typography variant="h6">{schedule.eventName}</Typography>
                <Typography variant="body1">Datum: {schedule.date}</Typography>
                <Typography variant="body1">Čas: {schedule.time}</Typography>
                <Typography variant="body1">Místo: {schedule.location}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Zavřít</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleDetail;
