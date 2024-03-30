import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

/**
 * Fetches private schedules from the server and displays them in a list.
 *
 * @return {JSX.Element} The JSX element representing the list of private schedules.
 */
const PrivateSchedules = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchPrivateSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:8080/schedules/private', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // token v localstorage
                    }
                });
                setSchedules(response.data);
            } catch (error) {
                console.error("Error fetching private schedules:", error);
            }
        };

        fetchPrivateSchedules();
    }, []);

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Soukromé Rozvrhy</Typography>
            <List>
                {schedules.map(schedule => (
                    <ListItem key={schedule.ScheduleID}>
                        <ListItemText
                            primary={schedule.ActivityName}
                            secondary={`${new Date(schedule.StartTime).toLocaleTimeString()} to ${new Date(schedule.EndTime).toLocaleTimeString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default PrivateSchedules;
