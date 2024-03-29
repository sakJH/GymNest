import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Box, Alert } from '@mui/material';

function HomePage() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Přihlášení/Registrace úspěšná! Credential Response:', credentialResponse);
    handleClose();
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: error => console.log(error),
  });

  const handleClickOpen = (login) => {
    setIsLogin(login);
    setOpen(true);
    // Reset stavových proměnných formuláře
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setPasswordError('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkPasswordStrength = (password) => {
    // Jednoduchá kontrola síly hesla
    if(password.length < 8) {
      return "Heslo musí být alespoň 8 znaků dlouhé.";
    }
    if(!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      return "Heslo musí obsahovat písmena a čísla.";
    }
    return "";
  };

  const handleSubmit = () => {
    if (!isLogin) {
      const passwordStrengthError = checkPasswordStrength(password);
      if(passwordStrengthError) {
        setPasswordError(passwordStrengthError);
        return;
      }
    }
    console.log('Formulář odeslán', { email, password, firstName, lastName });
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Vítejte na GymNest
      </Typography>
      <Button variant="outlined" onClick={() => handleClickOpen(true)} sx={{ marginRight: 1 }}>
        Přihlásit se
      </Button>
      <Button variant="outlined" onClick={() => handleClickOpen(false)}>
        Registrovat se
      </Button>
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

export default HomePage;