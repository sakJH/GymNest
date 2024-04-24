import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import UserSettingsForm from './UserSettingsForm';
import useMembershipTypes from '../../hooks/useMembershipTypes';
import axios from 'axios';
import { Typography, Paper, Button, List, ListItem, ListItemText, Modal, Box, Divider } from '@mui/material';

const UserInfo = () => {
    const { user } = useAuth();
    const [memberships, setMemberships] = useState([]);
    const { membershipTypes, loading: typesLoading, error: typesError } = useMembershipTypes();
    const [loading, setLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        if (user) {
            fetchMembershipInfo();
        }
    }, [user]);

    const fetchMembershipInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/api/memberships/user/${user.id}`);
            setMemberships(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching membership info:', error);
            setLoading(false);  // Ensure loading is set to false even if there is an error
        }
    };

    const handleChangeSettings = () => {
        setIsSettingsOpen(true); // Otevření modálního okna
    };

    const handleClose = () => {
        setIsSettingsOpen(false); // Zavření modálního okna
    };

    if (!user || loading || typesLoading) {
        return null;  // Return nothing while loading or if there is no user
    }

    const getMembershipName = (membershipTypeId) => {
        const type = membershipTypes.find(type => type.id === membershipTypeId);
        return type ? type.membershipName : 'Neznámý typ';
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h4" gutterBottom>
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
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Členství
                </Typography>
                <List>
                    {memberships.length > 0 ? (
                        memberships.map((membership, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemText primary="Typ členství" secondary={getMembershipName(membership.membershipTypeId)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Datum vypršení členství" secondary={membership.endDate} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Stav členství" secondary={membership.status} />
                                </ListItem>
                                {index < memberships.length - 1 && <Divider />}
                            </React.Fragment>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="Žádné aktivní členství" />
                        </ListItem>
                    )}
                </List>
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