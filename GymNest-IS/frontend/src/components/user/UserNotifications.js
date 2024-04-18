import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Alert } from '@mui/material';

const UserNotifications = () => {
    const { user, token } = useAuth(); // Využití autentizačního kontextu
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user) return; // Pokud není uživatel přihlášen, nevoláme API

        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/api/notifications/all/${encodeURIComponent(user.id)}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [user, token]);

		if (!user) {
			return null;
		}

    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h6" gutterBottom>
                Notifikace
            </Typography>
            <List>
                {notifications.length > 0 ? notifications.map(notification => (
                    <React.Fragment key={notification.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={notification.title}
                                secondary={notification.message}
                            />
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                )) : <Alert severity="info">Žádné notifikace.</Alert>}
            </List>
        </Paper>
    );
};

export default UserNotifications;