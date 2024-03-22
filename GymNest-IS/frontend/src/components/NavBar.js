import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          GymNest
        </Typography>
        <Button color="inherit" component={Link} to="/">Domů</Button>
        <Button color="inherit" component={Link} to="/akce">Akce</Button>
        <Button color="inherit" component={Link} to="/clenstvi">Členství</Button>
        <Button color="inherit" component={Link} to="/rozvrhy">Rozvrhy</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
