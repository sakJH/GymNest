import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import UserSettingsForm from './UserSettingsForm';  // Ujistěte se, že cesta k importu je správná
import axios from 'axios';
import { Typography, Paper, Button, List, ListItem, ListItemText, Divider, Modal, Box } from '@mui/material';

const UserInfo = () => {
    const { user } = useAuth();
    const [membershipInfo, setMembershipInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        if (user) {
            fetchMembershipInfo();
        }
    }, [user]);

    const fetchMembershipInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/api/memberships/get/${user.id}`);
            setMembershipInfo(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching membership info:', error);
        }
    };

    const handleChangeSettings = () => {
        setIsSettingsOpen(true); // Otevření modálního okna
    };

    const handleClose = () => {
        setIsSettingsOpen(false); // Zavření modálního okna
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
            </List>
            <Button variant="outlined" color="primary" onClick={handleChangeSettings}>
                Upravit nastavení
            </Button>
            <Modal
                open={isSettingsOpen}
                onClose={handleClose}
                aria-labelledby="settings-modal-title"
                aria-describedby="settings-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                    <UserSettingsForm handleClose={handleClose} user={user} />
                </Box>
            </Modal>
        </Paper>
    );
};

export default UserInfo;
