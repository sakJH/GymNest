import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import MembershipStatus from '../components/membership/MembershipStatus';
import PaymentHistory from '../components/membership/PaymentHistory';
import PayPalButton from '../components/membership/PayPalButton';
import { AuthContext } from '../components/AuthContext';

const MembershipPage = () => {
  const { token, user } = useContext(AuthContext);
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [availableMemberships, setAvailableMemberships] = useState([]);

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
          const paymentHistoryResponse = await axios.get(`${apiAddress}/payments/all/${user.id}`, {
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
        const membershipTypes = await axios.get(`${apiAddress}/memberships/types/all`)
        setAvailableMemberships(membershipTypes.data);
      } catch (error) {
        console.error("Error fetching available memberships:", error);
      }
    };

    fetchMembershipInfo();
    fetchPaymentHistory();
    fetchAvailableMemberships();
  }, [token, user]);

  return (
    < >
    {user && token && (
      <>
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <PayPalButton />
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Moje Členství</Typography>
        {membershipInfo && <MembershipStatus {...membershipInfo} />}
        <PaymentHistory payments={paymentHistory} />
      </Paper>
      </>
    )}
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Dostupná členství</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {availableMemberships.length > 0 ? (
              availableMemberships.map((membership, index) => (
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Žádná dostupná členství
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </>
  );
};

export default MembershipPage;