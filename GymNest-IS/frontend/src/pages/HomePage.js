import React, { useState, useContext } from 'react';
import { Box, Button, Typography, CircularProgress, Alert, Paper } from '@mui/material';
import { AuthContext } from '../components/AuthContext';
import UserInfo from '../components/user/UserInfo';
import UserNotifications from '../components/user/UserNotifications';
import AuthForm from '../components/AuthForm';
import ScheduleList from '../components/schedule/ScheduleList';
import { useSchedules } from '../hooks/useSchedules';
import { useReservedSchedules } from '../hooks/useReservedSchedules';

function HomePage() {
    const { user } = useContext(AuthContext);
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [viewMode, setViewMode] = useState('week');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { schedules, loading: loadingSchedules, error: errorSchedules } = useSchedules(currentWeek, viewMode, setLoading, setError);
    const { reservedSchedules, loading: loadingReserved, error: errorReserved } = useReservedSchedules(schedules, setLoading, setError);

    const handleOpenAuthDialog = () => {
        setShowAuthDialog(true);
    };

    const handleCloseAuthDialog = () => {
        setShowAuthDialog(false);
    };

    const displayedSchedules = user ? reservedSchedules : schedules;

    return (
        <div>
            {user ? (
                <>
                    <UserInfo />
                    <UserNotifications />
                    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
                        <Typography variant="h5" gutterBottom>Rezervované termíny</Typography>
                        <ScheduleList schedules={displayedSchedules} />
                    </Paper>
                </>
            ) : (
            <>
                <Box display="flex" alignItems="center" justifyContent="center" minHeight="20vh" sx={{ flexDirection: 'column', gap: 2 }}>
                    <Button sx={{ mt: 2, mb: 1 }} variant="contained" color="primary" onClick={handleOpenAuthDialog}>
                        Přihlásit se / Registrovat se
                    </Button>
                    <Typography variant="body1">Přihlaste se pro přístup k více informacím</Typography>
                </Box>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
                        <Typography variant="h5" gutterBottom>Všechny termíny</Typography>
                        <ScheduleList schedules={displayedSchedules} />
                    </Paper>
                )}
            </>
            )}
            <AuthForm open={showAuthDialog} onClose={handleCloseAuthDialog} />
        </div>
    );
}

export default HomePage;