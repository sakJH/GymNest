// AuthForm.js
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert, Box, Chip } from '@mui/material';
import { useAuth } from './AuthContext';
import axios from 'axios';

const AuthForm = ({ open, onClose }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
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
    const userData = isLogin ? { username, password } : { username, password, email, firstName, lastName };

    try {
        const response = await axios.post(`http://localhost:3001/api/auth/${endpoint}`, userData);
        if (response.data && response.data.token) {
            login(response.data.token, response.data.user);
            onClose();
        } else {
            throw new Error('No token received');
        }
    } catch (error) {
        setErrorMessage(`Nepodařilo se ${isLogin ? "přihlásit" : "zaregistrovat"}. Zkontrolujte své údaje.`);
    }
	};

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
							<TextField margin="dense" id="email" label="Emailová adresa" type="email" fullWidth variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
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
