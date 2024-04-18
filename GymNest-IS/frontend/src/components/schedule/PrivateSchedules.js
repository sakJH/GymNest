import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const PrivateSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const token = localStorage.getItem('token'); // Získání tokenu z localStorage

    useEffect(() => {
        if (!token) return; // Pokud token neexistuje, nevoláme API

        const fetchPrivateSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api/schedules/find/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSchedules(response.data);
            } catch (error) {
                console.error("Error fetching private schedule:", error);
            }
        };

        fetchPrivateSchedules();
    }, [token]);

    // Pokud není token, nezobrazujeme žádný obsah
    if (!token) {
        return null;
    }

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Soukromé Rozvrhy</Typography>
            <List>
                {schedules.length > 0 ? schedules.map(schedule => (
                    <ListItem key={schedule.id}>
                        <ListItemText
                            primary={`Activity ${schedule.activityId}`}
                            secondary={`${new Date(schedule.startTime).toLocaleString('cs-CZ', { dateStyle: 'medium', timeStyle: 'short' })} do ${new Date(schedule.endTime).toLocaleString('cs-CZ', { dateStyle: 'medium', timeStyle: 'short' })}`}
                        />
                    </ListItem>
                )) : <ListItem><ListItemText primary="Žádné rozvrhy k zobrazení" /></ListItem>}
            </List>
        </Paper>
    );
};

export default PrivateSchedules;