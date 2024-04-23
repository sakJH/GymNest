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

  // Funkce pro změnu kreditů uživatele
  const modifyUserCredits = async (userId, amountChange) => {
    console.log(amountChange);
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
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Moje Členství</Typography>
        {membershipInfo && <MembershipStatus {...membershipInfo} />}
        <PaymentHistory payments={paymentHistory} />
      </Paper>
      </>
    )}
    <AvailableMemberships memberships={availableMemberships} modifyCredits={modifyUserCredits} />
    </>
  );
};

export default MembershipPage;