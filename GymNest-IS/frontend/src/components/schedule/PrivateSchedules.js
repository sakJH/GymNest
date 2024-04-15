// PrivateSchedules.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

/**
 * Fetches private schedule from the server and displays them in a list.
 *
 * @return {JSX.Element} The JSX element representing the list of private schedule.
 */
const PrivateSchedules = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchPrivateSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/schedules/find/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // token v localstorage
                    }
                });
                setSchedules(response.data);
            } catch (error) {
                console.error("Error fetching private schedule:", error);
            }
        };

        fetchPrivateSchedules();
    }, []);

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Soukromé Rozvrhy</Typography>
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

export default PrivateSchedules;
