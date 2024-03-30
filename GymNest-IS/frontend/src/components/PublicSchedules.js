import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

/**
 * Fetches public schedules and renders them in a list.
 *
 * @return {JSX.Element} The rendered list of public schedules.
 */
const PublicSchedules = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:8080/schedules/public');
                setSchedules(response.data);
            } catch (error) {
                console.error("Error fetching public schedules:", error);
            }
        };

        fetchSchedules();
    }, []);

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Veřejné Rozvrhy</Typography>
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

export default PublicSchedules;