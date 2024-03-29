import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

/**
 * Renders the footer component.
 *
 * @return {JSX.Element} The rendered footer component.
 */
const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Bc. Jan Sakač a Bc. Matěj Boura
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" href="">
            GymNest.cz
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;