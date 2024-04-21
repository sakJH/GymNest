import React, { useState, useContext } from 'react';
import UserNotifications from '../components/user/UserNotifications';
import UserInfo from '../components/user/UserInfo';
import AuthForm from '../components/AuthForm';
import { Button, Box, Typography } from '@mui/material';
import { AuthContext } from '../components/AuthContext';

function HomePage() {
    const { user } = useContext(AuthContext);
    const [showAuthDialog, setShowAuthDialog] = useState(false);

    const handleOpenAuthDialog = () => {
        setShowAuthDialog(true);
    };

    const handleCloseAuthDialog = () => {
        setShowAuthDialog(false);
    };

    return (
        <div>
            {user ? (
                <>
                    <UserInfo />
                    <UserNotifications />
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" minHeight="80vh" sx={{ flexDirection: 'column', gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleOpenAuthDialog}>
                        Přihlásit se / Registrovat se
                    </Button>
                    <Typography variant="body1">Přihlaste se pro přístup k více informacím</Typography>
                </Box>
            )}
            <AuthForm open={showAuthDialog} onClose={handleCloseAuthDialog} />
        </div>
    );
}

export default HomePage;