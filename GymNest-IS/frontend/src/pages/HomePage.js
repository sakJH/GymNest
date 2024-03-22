import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Box } from '@mui/material';

function HomePage() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Vítejte na GymNest
      </Typography>
      <Button variant="outlined" onClick={handleClickOpen}>
        Přihlásit se
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Přihlášení</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Emailová adresa"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="password"
            label="Heslo"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zrušit</Button>
          <Button onClick={handleClose}>Přihlásit</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Veřejné rozvrhy
      </Typography>
      {/* Zde by se zobrazil seznam veřejných rozvrhů */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Soukromé rozvrhy
      </Typography>
      {/* Po přihlášení zde budou zobrazeny soukromé rozvrhy */}
    </Box>
  );
}

export default HomePage;