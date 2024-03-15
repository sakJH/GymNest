import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="body1" align="center">
                    © {new Date().getFullYear()} GymNest
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Autoři: Bc. Jan Sakač, Bc. Matěj Boura
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Zadavatel projektu: MOIS (FIM UHK group)
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    <Link href="#" color="inherit">
                        Odkaz 1
                    </Link>
                    {' | '}
                    <Link href="#" color="inherit">
                        Odkaz 2
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
