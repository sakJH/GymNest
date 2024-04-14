// Footer.js
import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

/**
 * Renders the footer component with social media links.
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
          <Link color="inherit" href="https://www.gymnest.cz">
            GymNest.cz
          </Link>
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
          <Link color="inherit" href="https://www.facebook.com/gymnest">
            <FacebookIcon />
          </Link>
          <Link color="inherit" href="https://www.instagram.com/gymnest">
            <InstagramIcon />
          </Link>
          <Link color="inherit" href="https://www.twitter.com/gymnest">
            <TwitterIcon />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;