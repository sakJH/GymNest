import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Typography, Paper } from '@mui/material';
import MembershipStatus from '../components/membership/MembershipStatus';
import AvailableMemberships from '../components/membership/AvailableMemberships';
import PaymentHistory from '../components/membership/PaymentHistory';
import PayPalButton from '../components/membership/PayPalButton';
import { AuthContext } from '../components/AuthContext';
import useMembershipTypes from '../hooks/useMembershipTypes';

const MembershipPage = () => {
  const { token, user, setCreditsUser } = useContext(AuthContext);
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const { membershipTypes, loading, error } = useMembershipTypes();

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

  useEffect(() => {
    fetchMembershipInfo();
    fetchPaymentHistory();
  }, [token, user]);

  const onRenew = async (membershipId) => {
    try {
      // Získání aktuálních informací o členství
      const membershipResponse = await axios.get(`${apiAddress}/memberships/get/${membershipId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (membershipResponse.status !== 200 || !membershipResponse.data) {
        alert('Nepodařilo se získat informace o členství.');
        return;
      }

      const membershipType = membershipTypes.find(type => type.id === membershipResponse.data.membershipTypeId);
      if (!membershipType) {
        alert('Nepodařilo se získat typ členství.');
        return;
      }
      const paymentAmount = membershipType.membershipPrice;

      // Potvrzení od uživatele
      const confirmRenew = window.confirm(`Opravdu chcete obnovit členství za ${paymentAmount} kreditů?`);
      if (!confirmRenew) {
        return; // Uživatel stiskl Cancel, obnova nebude provedena
      }

      const currentEndDate = new Date(membershipResponse.data.endDate);
      currentEndDate.setMonth(currentEndDate.getMonth() + 1); // Přidá jeden měsíc k současnému datu expirace
      const newEndDate = currentEndDate.toISOString().slice(0, 10); // Konverze na YYYY-MM-DD

      // Aktualizace členství s novým datem expirace
      const updateResponse = await axios.put(`${apiAddress}/memberships/update/${membershipId}`, {
        endDate: newEndDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (updateResponse.status === 200) {
        alert('Členství bylo úspěšně prodlouženo');
        fetchMembershipInfo(); // Znovu načíst informace o členství po aktualizaci

        // Zavolání funkce handlePurchase pro zpracování platby
        await handlePurchase(user.id, membershipId, paymentAmount);
      }
    } catch (error) {
      console.error('Failed to renew membership:', error);
      alert('Nepodařilo se prodloužit členství. Zkuste to prosím znovu.');
    }
  };

  const onCancel = async (membershipId) => {
    try {
      // Potvrzení od uživatele
      const confirmCancel = window.confirm(`Opravdu chcete zrušit dané členství?`);
      if (!confirmCancel) {
        return; // Uživatel stiskl Cancel, obnova nebude provedena
      }

      const response = await axios.delete(`${apiAddress}/memberships/delete/${membershipId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 204 || response.status === 200) {
        alert('Členství bylo úspěšně zrušeno');
        fetchPaymentHistory();
        fetchMembershipInfo(); // Znovu načíst informace o členství po smazání
      }
    } catch (error) {
      console.error('Failed to cancel membership:', error);
      alert('Nepodařilo se zrušit členství. Zkuste to prosím znovu.');
    }
  };

  const handlePurchase = async (userId, membershipId, amount, customDescription = null) => {
    const absAmount = Math.abs(amount);
    const formattedAmount = absAmount.toFixed(2);
    try {
        // Zkontrolovat, zda je customDescription null nebo undefined, a nastavit výchozí hodnotu
        const description = customDescription ?? 'Platba za Členství';
        await handleCreatePayment(membershipId, formattedAmount, description);
        await modifyUserCredits(userId, amount);
    } catch (error) {
        console.error('Transaction failed:', error);
        alert('Transaction failed. Please try again.');
    }
  };

  const handleCreatePayment = async (membershipId, amount, description = null) => {
    const paymentDetails = {
        amount: amount,
        paymentDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD format
        status: 'completed',
        membershipId: membershipId,
        description: description
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
        <PaymentHistory payments={paymentHistory} memberships={membershipInfo} membershipTypes={membershipTypes} />
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Moje Členství</Typography>
        {membershipInfo && membershipTypes && <MembershipStatus memberships={membershipInfo} membershipTypes={membershipTypes} onRenew={onRenew} onCancel={onCancel} />}
      </Paper>
      </>
    )}
    <AvailableMemberships memberships={membershipTypes} onPurchase={handlePurchase} />
    </>
  );
};

export default MembershipPage;