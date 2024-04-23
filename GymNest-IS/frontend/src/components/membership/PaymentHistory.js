import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const PaymentHistory = ({ payments, memberships, membershipTypes }) => {
  // Funkce pro získání názvu typu členství
  const getMembershipTypeName = (membershipTypeId) => {
    const type = membershipTypes.find(type => type.id === membershipTypeId);
    return type ? type.membershipName : 'Neznámý typ';
  };

  // Funkce pro získání dat členství
  const getMembershipData = (membershipId) => {
    const membership = memberships.find(m => m.id === membershipId);
    return membership ? {
      startDate: membership.startDate,
      endDate: membership.endDate,
      typeName: getMembershipTypeName(membership.membershipTypeId)
    } : null;
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h4">Historie plateb</Typography>
      <List>
        {payments.map((payment, index) => {
          const membership = getMembershipData(payment.membershipId);
          return (
            <ListItem key={index}>
              <ListItemText
                primary={`Částka: ${payment.amount}`}
                secondary={`Datum platby: ${payment.paymentDate}, Typ členství: ${membership ? membership.typeName : 'Neznámé'}, Začátek členství: ${membership ? membership.startDate : 'Neznámý'}, Konec členství: ${membership ? membership.endDate : 'Neznámý'}${payment.description ? ', Popis: ' + payment.description : ''}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default PaymentHistory;