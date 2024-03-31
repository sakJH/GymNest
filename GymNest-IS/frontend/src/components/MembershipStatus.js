import React from 'react';
import { Typography, Box } from '@mui/material';

const MembershipStatus = ({ membershipType, validUntil }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">Stav vašeho členství</Typography>
      <Typography>Typ členství: {membershipType}</Typography>
      <Typography>Platné do: {validUntil}</Typography>
    </Box>
  );
};

export default MembershipStatus;