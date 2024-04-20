import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UserSettingsForm = ({ user, handleClose }) => {
    const [formData, setFormData] = useState({
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        preferredCurrency: user.preferredCurrency || 'CZK',
        colorScheme: user.colorScheme || 'light',
        password: '',
        credits: user.credits || 0
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateUser = async () => {
        try {
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            };
            await axios.put(`http://localhost:3001/api/users/${user.username}`, updateData);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const updatePreferences = async () => {
        try {
            const preferences = {
                preferredCurrency: formData.preferredCurrency,
                colorScheme: formData.colorScheme
            };
            await axios.put(`http://localhost:3001/api/users/${user.id}/preferences`, preferences);
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser();
        await updatePreferences();
        handleClose();
    };

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Nastavení uživatele</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="firstName"
                    label="Jméno"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="lastName"
                    label="Příjmení"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Měna</InputLabel>
                    <Select
                        name="preferredCurrency"
                        value={formData.preferredCurrency}
                        onChange={handleChange}
                        label="Měna"
                    >
                        <MenuItem value="CZK">CZK</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Barevné schéma</InputLabel>
                    <Select
                        name="colorScheme"
                        value={formData.colorScheme}
                        onChange={handleChange}
                        label="Barevné schéma"
                    >
                        <MenuItem value="light">Světlé</MenuItem>
                        <MenuItem value="dark">Tmavé</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Zrušit</Button>
                <Button onClick={handleSubmit}>Uložit změny</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserSettingsForm;
