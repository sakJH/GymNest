import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { AuthContext } from '../AuthContext';

const UserSettingsForm = ({ user, handleClose }) => {
    const { setCreditsUser, token, logout } = useContext(AuthContext);
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
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateUser = async () => {
        try {
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                preferredCurrency: formData.preferredCurrency,
                colorScheme: formData.colorScheme
            };

            const response = await axios.put(`http://localhost:3001/api/users/${user.username}`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data) {
                // Zde předpokládáme, že server vrací aktualizované údaje uživatele
                setCreditsUser({ ...user, ...updateData });
                alert('Uživatelské údaje byly úspěšně aktualizovány.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser();
        handleClose();
    };

    const handleRemoveAccount = () => {
        setOpenConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/users/${user.username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            logout(); // Odhlášení uživatele a smazání JWT tokenu
            handleClose();
        } catch (error) {
            console.error('Error removing account:', error);
        }
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
                <Button onClick={handleRemoveAccount}>Odstranit účet</Button>
                <Button onClick={handleSubmit}>Uložit změny</Button>
            </DialogActions>
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
            >
                <DialogTitle>Potvrzení</DialogTitle>
                <DialogContent>
                    <DialogContentText>Opravdu chcete smazat váš účet? Tato akce je nevratná.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Ne</Button>
                    <Button onClick={confirmDelete} color="secondary">Ano, smazat</Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
};
export default UserSettingsForm;
