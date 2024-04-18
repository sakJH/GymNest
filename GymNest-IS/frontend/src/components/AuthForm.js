// AuthForm.js
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert, Box, Chip } from '@mui/material';
import { useAuth } from './AuthContext';
import axios from 'axios';

const AuthForm = ({ open, onClose }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const { user, login, logout, errorMessage, setErrorMessage, credits } = useAuth();

	const toggleLoginRegister = () => {
		setIsLogin(!isLogin); // Přepne stav mezi přihlášením a registrací
	};

	const googleLogin = useGoogleLogin({
		onSuccess: tokenResponse => {
			login(tokenResponse.access_token);
		},
		onError: () => {
			setErrorMessage('Přihlášení přes Google se nezdařilo.');
		}
	});

	const handleSubmit = async () => {
		const endpoint = isLogin ? 'login' : 'register';
		const userData = isLogin ? { username, password } : { username, password, firstName, lastName };

		try {
			const response = await axios.post(`http://localhost:3001/api/auth/${endpoint}`, userData);
			login(response.data.token, response.data.user);
			onClose();
		} catch (error) {
			setErrorMessage(`Nepodařilo se ${isLogin ? "přihlásit" : "zaregistrovat"}. Zkontrolujte své údaje.`);
		}
	};

	if (user) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<Chip label={`${user.username} (${user.role})`} color="primary" />
				<Chip label={`Kredity: ${user.credits}`} color="secondary" />
				<Button color="inherit" onClick={logout}>Odhlásit</Button>
			</Box>
		);
	}

	return (
		<>
			<Button variant="outlined" onClick={toggleLoginRegister}>
				Přepnout na {isLogin ? "Registraci" : "Přihlášení"}
			</Button>
			<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
				<DialogTitle>{isLogin ? "Přihlášení" : "Registrace"}</DialogTitle>
				<DialogContent>
					{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
					<TextField autoFocus margin="dense" id="username" label="Uživatelské jméno" type="text" fullWidth variant="standard" value={username} onChange={(e) => setUsername(e.target.value)} />
					{!isLogin && (
						<>
							<TextField margin="dense" id="firstname" label="Jméno" type="text" fullWidth variant="standard" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
							<TextField margin="dense" id="lastname" label="Příjmení" type="text" fullWidth variant="standard" value={lastName} onChange={(e) => setLastName(e.target.value)} />
						</>
					)}
					<TextField margin="dense" id="password" label="Heslo" type="password" fullWidth variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
				</DialogContent>
				<DialogActions style={{ justifyContent: 'space-between' }}>
					<Button onClick={toggleLoginRegister} color="primary">
						{isLogin ? "Chcete se registrovat?" : "Chcete se přihlásit?"}
					</Button>
					<Button onClick={onClose}>Zrušit</Button>
					<Button onClick={handleSubmit} color="primary">{isLogin ? "Přihlásit" : "Registrovat"}</Button>
					<Button onClick={googleLogin} variant="contained" style={{ backgroundColor: '#4285F4', color: 'white' }}>
						{isLogin ? "Přihlásit se přes Google" : "Registrovat se přes Google"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AuthForm;
