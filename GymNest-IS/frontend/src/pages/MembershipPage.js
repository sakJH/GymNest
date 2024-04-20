import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';
import MembershipStatus from '../components/membership/MembershipStatus';
import PaymentHistory from '../components/PaymentHistory';
import PayPalButton from '../components/PayPalButton';
import { AuthContext } from '../components/AuthContext';
import UserSettingsForm from '../components/user/UserSettingsForm';

const MembershipPage = () => {
  const { token, user, logout } = useContext(AuthContext);
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [availableMemberships, setAvailableMemberships] = useState([]);
  const [showSettings, setShowSettings] = useState(false); // State to control visibility of UserSettingsForm

  const apiAddress = 'http://localhost:3002/api';

  useEffect(() => {
    const fetchMembershipInfo = async () => {
      if (token && user && user.id) {
        try {
          const membershipResponse = await axios.get(`${apiAddress}/memberships/user/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          setMembershipInfo(membershipResponse.data);
        } catch (error) {
          console.error("Error fetching membership info:", error);
        }
      }
    };

    const fetchPaymentHistory = async () => {
      if (token && user && user.id) {
        try {
          const paymentHistoryResponse = await axios.get(`${apiAddress}/memberships/user/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          setPaymentHistory(paymentHistoryResponse.data);
        } catch (error) {
          console.error("Error fetching payment history:", error);
        }
      }
    };

    const fetchAvailableMemberships = async () => {
      try {
        const response = await axios.get(`${apiAddress}/memberships/all`);
        setAvailableMemberships(response.data);
      } catch (error) {
        console.error("Error fetching available memberships:", error);
      }
    };

    fetchMembershipInfo();
    fetchPaymentHistory();
    fetchAvailableMemberships();
  }, [token, user]);

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  if (!token || !user) {
    return (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>Dostupná členství</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {availableMemberships.map((membership, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {membership.membershipType}
                      </TableCell>
                      <TableCell align="right">{membership.membershipPrice} Kč/měsíc</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
    );
  }

  return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Moje Členství</Typography>
        {membershipInfo && <MembershipStatus {...membershipInfo} />}
        <PaymentHistory payments={paymentHistory} />
        <PayPalButton />
        <Button variant="contained" color="primary" onClick={handleOpenSettings}>
          Upravit nastavení
        </Button>
        {showSettings && <UserSettingsForm user={user} handleClose={handleCloseSettings} logout={logout} />}
      </Box>
  );
};

export default MembershipPage;
