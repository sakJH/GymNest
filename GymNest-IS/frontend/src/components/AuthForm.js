// AuthForm.js
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert, Box, Typography } from '@mui/material';
import { useAuth } from './AuthContext';

/**
 * AuthForm component for handling user authentication and form submission.
 *
 * @return {JSX.Element} The rendered JSX element for the AuthForm component
 */
const AuthForm = () => {
	const [open, setOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { login, errorMessage, setErrorMessage } = useAuth();

  const googleLogin = useGoogleLogin({
		onSuccess: tokenResponse => {
			console.log('Google Přihlášení úspěšné!', tokenResponse);
			login(tokenResponse.access_token); // Předání tokenu do vašeho AuthContext
		},
		onError: error => {
			console.log('Google Přihlášení selhalo!', error);
			setErrorMessage('Přihlášení přes Google se nezdařilo. Prosím, zkuste to znovu.'); // Zobrazení chyby uživateli
	},
  });

	const handleClickOpen = (isLogin) => {
		setIsLogin(isLogin);
		setOpen(true);
		resetForm();
	};

	const handleClose = () => {
		setOpen(false);
		setErrorMessage('');
	};

	const resetForm = () => {
		setEmail('');
		setPassword('');
		setFirstName('');
		setLastName('');
		setPasswordError('');
		setErrorMessage('');
	};

	/**
	 * Checks the strength of a password and returns an error message if it is weak.
	 *
	 * @param {string} password - The password to be checked.
	 * @return {string} An error message if the password is weak, otherwise an empty string.
	 */
	const checkPasswordStrength = (password) => {
		if(password.length < 8) {
			return "Heslo musí být alespoň 8 znaků dlouhé.";
		}
		if(!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
			return "Heslo musí obsahovat písmena a čísla.";
		}
		return "";
	};

  const handleSubmit = () => {
    const passwordStrengthError = !isLogin ? checkPasswordStrength(password) : '';
    if(passwordStrengthError) {
      setPasswordError(passwordStrengthError);
      return;
    }
    login("jwt_token", { email, firstName, lastName }); // Aktualizace stavu autentizace
    setIsLoggedIn(true);
    handleClose();
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
			{!isLoggedIn && (
				<>
					<Typography variant="h4">
						{isLogin ? "Přihlásit se" : "Registrovat se"}
					</Typography>
					<Box>
						<Button variant="outlined" onClick={() => handleClickOpen(true)} sx={{ marginRight: 1 }}>
							Přihlásit se
						</Button>
						<Button variant="outlined" onClick={() => handleClickOpen(false)}>
							Registrovat se
						</Button>
					</Box>
				</>
			)}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{isLogin ? "Přihlášení" : "Registrace"}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						label="Emailová adresa"
						type="email"
						fullWidth
						variant="standard"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						margin="dense"
						id="password"
						label="Heslo"
						type="password"
						fullWidth
						variant="standard"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{passwordError && <Alert severity="error">{passwordError}</Alert>}
					{!isLogin && (
					<>
					<TextField
						margin="dense"
						id="firstname"
						label="Jméno"
						type="text"
						fullWidth
						variant="standard"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<TextField
						margin="dense"
						id="lastname"
						label="Příjmení"
						type="text"
						fullWidth
						variant="standard"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					</>
					)}
				</DialogContent>
				<DialogActions style={{ justifyContent: 'space-between' }}>
					<Box>
						<Button onClick={handleClose}>Zrušit</Button>
						<Button onClick={handleSubmit} color="primary">
						{isLogin ? "Přihlásit" : "Registrovat"}
						</Button>
					</Box>
					<Button
						onClick={googleLogin}
						variant="contained"
						style={{ backgroundColor: '#4285F4', color: 'white' }}
					>
						{isLogin ? "Přihlásit se přes Google" : "Registrovat se přes Google"}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default AuthForm;