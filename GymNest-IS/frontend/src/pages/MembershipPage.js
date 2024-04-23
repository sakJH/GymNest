import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Typography, Paper } from '@mui/material';
import MembershipStatus from '../components/membership/MembershipStatus';
import AvailableMemberships from '../components/membership/AvailableMemberships';
import PaymentHistory from '../components/membership/PaymentHistory';
import PayPalButton from '../components/membership/PayPalButton';
import { AuthContext } from '../components/AuthContext';

const MembershipPage = () => {
  const { token, user, setCreditsUser } = useContext(AuthContext);
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [availableMemberships, setAvailableMemberships] = useState([]);

  const apiAddress = 'http://localhost:3002/api';

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

  useEffect(() => {
    fetchMembershipInfo();
    fetchPaymentHistory();
    fetchAvailableMemberships();
  }, [token, user]);

  const onRenew = async (membershipId) => {
    console.log(`Renewing membership ID: ${membershipId}`);
    // Add renew logic here, e.g., API call
  };

  const onCancel = async (membershipId) => {
    console.log(`Canceling membership ID: ${membershipId}`);
    // Add cancel logic here, e.g., API call
  };

  const handlePurchase = async (userId, membershipId, amount) => {
    const absAmount = Math.abs(amount)
    const formattedAmount = absAmount.toFixed(2);
    try {
      await handleCreatePayment(membershipId, formattedAmount);
      await modifyUserCredits(userId, amount);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    }
  }

  const handleCreatePayment = async (membershipId, amount) => {
    const paymentDetails = {
      amount: amount,
      paymentDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD format
      status: 'completed',
      membershipId: membershipId,
      description: 'Payment for membership'
    };

    try {
      const response = await axios.post(`${apiAddress}/payments/create`, paymentDetails, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        fetchPaymentHistory();
      }
    } catch (error) {
      console.error('Failed to create payment:', error);
    }
  };

  // Funkce pro změnu kreditů uživatele
  const modifyUserCredits = async (userId, amountChange) => {
    // Rozhoduje, zda použít endpoint pro přidání nebo odebrání kreditů
    const endpoint = amountChange > 0 ? 'add' : 'remove';
    // Ujistěte se, že odesíláte absolutní hodnotu množství, protože 'remove' endpoint může očekávat pozitivní číslo
    const absAmountChange = Math.abs(amountChange);

    try {
        const response = await axios.post(`http://localhost:3001/api/users/${userId}/credits/${endpoint}`, {
            amount: absAmountChange
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.user) {
            setCreditsUser(response.data.user);
            alert(`Změna kreditů byla úspěšně provedena. Nový stav kreditů: ${response.data.user.credits}`);
        }
    } catch (error) {
        console.error(`Failed to ${endpoint} credits:`, error);
        alert(`Nepodařilo se ${endpoint === 'add' ? 'přidat' : 'odebrat'} kredity. Zkuste to prosím znovu.`);
    }
  };

  return (
    < >
    {user && token && (
      <>
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <PayPalButton modifyCredits={modifyUserCredits} />
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <PaymentHistory payments={paymentHistory} memberships={membershipInfo} membershipTypes={availableMemberships} />
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Moje Členství</Typography>
        {membershipInfo && availableMemberships && <MembershipStatus memberships={membershipInfo} membershipTypes={availableMemberships} onRenew={onRenew} onCancel={onCancel} />}
      </Paper>
      </>
    )}
    <AvailableMemberships memberships={availableMemberships} onPurchase={handlePurchase} />
    </>
  );
};

export default MembershipPage;