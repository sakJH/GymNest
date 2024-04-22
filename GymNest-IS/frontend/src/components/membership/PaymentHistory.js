import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const PaymentHistory = ({ payments }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">Historie plateb</Typography>
      <List>
        {payments.map((payment, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Částka: ${payment.amount}`} secondary={`Datum: ${payment.paymentDate}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PaymentHistory;