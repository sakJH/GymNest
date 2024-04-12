// MembershipStatus.js
import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const MembershipStatus = ({ membershipType, validUntil, startDate, price, onRenew }) => {
    return (
        <Box sx={{
            marginBottom: 2,
            border: '1px solid lightgray',
            borderRadius: '8px',
            padding: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>Stav vašeho členství</Typography>
            <Typography variant="body1">Typ členství: {membershipType}</Typography>
            <Typography variant="body1">Začátek členství: {startDate}</Typography>
            <Typography variant="body1">Platné do: {validUntil}</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Cena: {price} Kč</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={onRenew}
                sx={{ marginTop: 2 }}
            >
                Obnovit členství
            </Button>
        </Box>
    );
};
export default MembershipStatus;
