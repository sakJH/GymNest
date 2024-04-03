import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import MembershipStatus from '../components/MembershipStatus';
import PaymentHistory from '../components/PaymentHistory';
import PayPalButton from '../components/PayPalButton';
import { AuthContext } from '../components/AuthContext';

const MembershipPage = () => {
  const { token } = useContext(AuthContext); // Přístup k JWT tokenu přes kontext
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchMembershipInfo = async () => {
      try {
        const membershipResponse = await axios.get('http://localhost:8080/api/memberships/user/', { //TODO jak s tím {userId}?
          headers: {
            'Authorization': `Bearer ${token}`, // Předání JWT tokenu v headeru
          }
        });
        setMembershipInfo(membershipResponse.data);
      } catch (error) {
        console.error("Error fetching membership info:", error);
      }
    };

    const fetchPaymentHistory = async () => {
      try {
        const paymentHistoryResponse = await axios.get('http://localhost:8080/api/payments/subscription/', { //TODO jak s tím {userId}?
          headers: {
            'Authorization': `Bearer ${token}`, // Předání JWT tokenu v headeru
          }
        });
        setPaymentHistory(paymentHistoryResponse.data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    if (token) {
      fetchMembershipInfo();
      fetchPaymentHistory();
    }
  }, [token]);

  if (!token) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Prosím, přihlaste se pro zobrazení informací o členství.</Typography>
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
    </Box>
  );
};

export default MembershipPage;
