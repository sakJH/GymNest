import React, { useContext } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableRow, TableContainer, Paper, Typography, IconButton, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AuthContext } from '../AuthContext';

const AvailableMemberships = ({ memberships, modifyCredits }) => {
  const { user, token } = useContext(AuthContext); // Použijte kontext pro získání informací o uživateli a jeho token

  const handlePurchase = async (membership) => {
    if (!user) {
      alert("Pro zakoupení členství musíte být přihlášeni.");
      return;
    }

    // Kontrola, zda má uživatel dostatek kreditů
    if (user.credits < membership.membershipPrice) {
      alert("Nemáte dostatek kreditů pro zakoupení tohoto členství.");
      return;
    }

    const purchaseData = {
      userId: user.id,
      membershipTypeId: membership.id,
      startDate: new Date(),
      endDate: membership.expirationDate
    };
    const credits = 0 - membership.membershipPrice;

    try {
      const response = await axios.post('http://localhost:3002/api/memberships/create', purchaseData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.status === 201) {
        alert('Členství bylo úspěšně zakoupeno. Vaše kredity byly aktualizovány.');
        modifyCredits(user.id, credits);
        return response.data;
      }
    } catch (error) {
      console.error('Error purchasing membership:', error);
      alert('Nepodařilo se zakoupit členství, zkuste to prosím znovu.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Dostupná členství</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {memberships.length > 0 ? (
              memberships.map((membership, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {membership.membershipName}
                  </TableCell>
                  <TableCell align='right'>
                    {membership.membershipPrice} {membership.currency}
                  </TableCell>
                  <TableCell align='right'>
                    Datum expirace: {membership.expirationDate}
                  </TableCell>
                  <TableCell align='right'>
                    {user && ( // Zobrazit ikonu pouze pokud je uživatel přihlášen
                      <Tooltip title="Zakoupit">
                        <IconButton
                          onClick={() => handlePurchase(membership)}
                          color="primary"
                        >
                          <ShoppingCartIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Žádná dostupná členství
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AvailableMemberships;