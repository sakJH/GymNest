// AuthForm.js
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert, Box, Typography } from '@mui/material';
import { useAuth } from './AuthContext';
import axios from 'axios';

const AuthForm = () => {
	const [open, setOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const { login, logout, errorMessage, setErrorMessage } = useAuth();

	const googleLogin = useGoogleLogin({
		onSuccess: tokenResponse => {
			login(tokenResponse.access_token); // Předání tokenu do vašeho AuthContext
		},
		onError: error => {
			setErrorMessage('Přihlášení přes Google se nezdařilo. Prosím, zkuste to znovu.');
		}
	});

	const handleClickOpen = (loginMode) => {
		setIsLogin(loginMode);
		setOpen(true);
		resetForm();
	};

	const handleClose = () => {
		setOpen(false);
		setErrorMessage('');
		resetForm();
	};

	const resetForm = () => {
		setEmail('');
		setPassword('');
		setFirstName('');
		setLastName('');
		setPasswordError('');
	};

	const handleSubmit = () => {
		if (isLogin) {
			handleLogin();
		} else {
			handleRegister();
		}
	};

	const handleLogin = async () => {
		try {
			const response = await axios.post(`http://localhost:3001/api/auth/login`, { email, password });
			login(response.data.token, response.data.user, response.data.role);
			handleClose();
		} catch (error) {
			setErrorMessage('Nepodařilo se přihlásit. Zkontrolujte své údaje.');
		}
	};

	const handleRegister = async () => {
		try {
			const response = await axios.post(`http://localhost:3001/api/auth/register`, { email, password, firstName, lastName });
			login(response.data.token, response.data.user, response.data.role);
			handleClose();
		} catch (error) {
			setErrorMessage('Nepodařilo se zaregistrovat. Zkontrolujte své údaje.');
		}
	};

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 2
		}}>
			{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
			<Typography variant="h4">{isLogin ? "Přihlásit se" : "Registrovat se"}</Typography>
			<Box>
				<Button variant="outlined" onClick={() => handleClickOpen(true)} sx={{ marginRight: 1 }}>
					Přihlásit se
				</Button>
				<Button variant="outlined" onClick={() => handleClickOpen(false)}>
					Registrovat se
				</Button>
			</Box>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{isLogin ? "Přihlášení" : "Registrace"}</DialogTitle>
				<DialogContent>
					<TextField autoFocus margin="dense" id="email" label="Emailová adresa" type="email" fullWidth variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
					<TextField margin="dense" id="password" label="Heslo" type="password" fullWidth variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
					{!isLogin && (
						<>
							<TextField margin="dense" id="firstname" label="Jméno" type="text" fullWidth variant="standard" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
							<TextField margin="dense" id="lastname" label="Příjmení" type="text" fullWidth variant="standard" value={lastName} onChange={(e) => setLastName(e.target.value)} />
						</>
					)}
				</DialogContent>
				<DialogActions style={{ justifyContent: 'space-between' }}>
					<Button onClick={handleClose}>Zrušit</Button>
					<Button onClick={handleSubmit} color="primary">
						{isLogin ? "Přihlásit" : "Registrovat"}
					</Button>
					<Button onClick={googleLogin} variant="contained" style={{ backgroundColor: '#4285F4', color: 'white' }}>
						{isLogin ? "Přihlásit se přes Google" : "Registrovat se přes Google"}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
export default AuthForm;
