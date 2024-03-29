import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * This function renders a Navbar component with user information and navigation buttons.
 *
 * @return {JSX.Element} The Navbar component with user info and navigation buttons.
 */
const Navbar = () => {
  const [user, setUser] = useState({ name: "TEST", credits: 150 });

  useEffect(() => {
    setUser({ name: "TEST", credits: 150 });
  }, []);

  return (
    <AppBar position="static">
      <Toolbar sx={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 2
      }}>
        <Box style={{ display: 'flex', alignItems: 'left' }}>
          {/* Logo a název aplikace */}
          <Typography variant="h6" component={Link} to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            GymNest
          </Typography>
        </Box>

        {/* Informace o uživateli */}
        {user && (
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography color="inherit">Vitej uzivateli {user.name}</Typography>
            <Chip label={`Kredity: ${user.credits}`} color="secondary" style={{ marginLeft: 10 }} />
          </Box>
        )}

        {/* Navigační tlačítka zarovnaná do prava */}
        <Box style={{ display: 'flex', alignItems: 'right' }}>
          <Button color="inherit" component={Link} to="/">Domů</Button>
          <Button color="inherit" component={Link} to="/akce">Akce</Button>
          <Button color="inherit" component={Link} to="/clenstvi">Členství</Button>
          <Button color="inherit" component={Link} to="/rozvrhy">Rozvrhy</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;