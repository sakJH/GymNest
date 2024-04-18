import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { Typography, Paper, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [membershipInfo, setMembershipInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchMembershipInfo();
        }
    }, [user]);

    const fetchMembershipInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/api/memberships/${user.id}`);
            setMembershipInfo(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching membership info:', error);
        }
    };

    const handleChangePassword = () => {
        // Přesměrujte uživatele na stránku pro změnu hesla
        navigate('/change-password');
    };

    if (!user || loading) {
        return null;
    }

    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h5" gutterBottom>
                Informace o uživateli
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Jméno" secondary={`${user.firstName} ${user.lastName}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Uživatelské jméno" secondary={user.username} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Email" secondary={user.email} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Datum vypršení členství" secondary={membershipInfo.endDate} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Tier členství" secondary={membershipInfo.membershipType} />
                </ListItem>
                <Divider light />
            </List>
            <Button variant="outlined" color="primary" onClick={handleChangePassword}>
                Změnit heslo
            </Button>
        </Paper>
    );
};

export default UserInfo;