// PublicSchedules.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

/**
 * Fetches public schedule and renders them in a list.
 *
 * @return {JSX.Element} The rendered list of public schedule.
 */
const PublicSchedules = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/schedules/all');
                setSchedules(response.data);
            } catch (error) {
                console.error("Error fetching public schedule:", error);
            }
        };

        fetchSchedules();
    }, []);

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Veřejné Rozvrhy</Typography>
            <List>
                {schedules.map(schedule => (
                    <ListItem key={schedule.id}>
                        <ListItemText
                            primary={`Activity ${schedule.activityId}`}
                            secondary={`${new Date(schedule.startTime).toLocaleString('cs-CZ', { dateStyle: 'medium', timeStyle: 'short' })} do ${new Date(schedule.endTime).toLocaleString('cs-CZ', { dateStyle: 'medium', timeStyle: 'short' })}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default PublicSchedules;