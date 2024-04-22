import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button, Typography, Box, TextField, Slider } from '@mui/material';
import { useAuth } from '../AuthContext';

const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    intent: "capture",
};

const currencyOptions = ["CZK", "USD", "EUR"];
const exchangeRates = { USD: 23, EUR: 25, CZK: 1 }; //TODO vylepseni o aktualni kurzy z nejakeho api

const PayPalButton = () => {
    const { user, setCreditsUser, token } = useAuth();
    const [selectedCurrency, setSelectedCurrency] = useState(user?.preferredCurrency || "USD");
    const [amount, setAmount] = useState(1);
    const [showPayPalButton, setShowPayPalButton] = useState(false);

    useEffect(() => {
        if (user && user.preferredCurrency) {
            setSelectedCurrency(user.preferredCurrency);
            initialOptions.currency = user.preferredCurrency;
        }
    }, [user]);

    const handleApprove = async (data, actions) => {
        try {
            const capture = await actions.order.capture();
            console.log('Capture result:', capture);

            if (capture.status === 'COMPLETED') {
                const amountInCZK = amount * exchangeRates[selectedCurrency];
                addUserCreditsToServer(user.id, amountInCZK);
            } else {
                // Zpracování neúspěšného stavu objednávky
                alert('Platba nebyla úspěšná. Prosím, zkuste to znovu.');
            }
        } catch (error) {
            console.error('Chyba při zpracování platby:', error);
            alert('Nastala chyba při zpracování vaší platby. Prosím, kontaktujte podporu.');
        }
    };

    const addUserCreditsToServer = async (userId, amountToAdd) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/users/${userId}/credits/add`, {
                amount: amountToAdd
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.user) {
                setCreditsUser(response.data.user);
                alert(`Kredity byly úspěšně připsány! Přidán: ${amountToAdd} kredit.`);
            }
        } catch (error) {
            console.error("Failed to add credits:", error);
            alert("Nepodařilo se přidat kredity. Zkuste to prosím znovu.");
        }
    };

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        initialOptions.currency = currency;
    };

    const handleInputChange = (event) => {
        setAmount(event.target.value);
    };

    const handleConfirmClick = () => {
        console.log("Amount:", amount);
        console.log("Currency:", selectedCurrency);
        handleCurrencySelect(selectedCurrency);
        setShowPayPalButton(true);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
        }}>
            <Typography variant="h4">Dobití kreditu</Typography>
            <Typography variant="h6">Vyber měnu a částku</Typography>
            {!showPayPalButton && (
                <React.Fragment>
                    <Box>
                        {currencyOptions.map((currency, index) => (
                            <Button
                                variant={currency === selectedCurrency ? "contained" : "outlined"}
                                key={index}
                                onClick={() => handleCurrencySelect(currency)}
                                sx={{ margin: 1, fontWeight: currency === selectedCurrency ? 'bold' : 'normal' }}
                            >
                                {currency}
                            </Button>
                        ))}
                    </Box>
                    <Typography variant="h6">Zadej částku</Typography>
                    <Box sx={{ width: 300, padding: 2 }}>
                        <TextField
                            value={amount}
                            onChange={handleInputChange}
                            type="number"
                            inputProps={{
                                step: 1,
                                min: 1,
                                max: 1000000,
                                type: 'number',
                            }}
                            sx={{ width: 300, mt: 2 }}
                        />
                    </Box>
                    <Button onClick={handleConfirmClick} variant="contained" sx={{ mt: 2 }}>
                        Potvrdit a platit
                    </Button>
                </React.Fragment>
            )}
            {showPayPalButton && (
                <Box maxWidth="400px" width="100%">
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={{ layout: "vertical", tagline: false }}
                            createOrder={(data, actions) => {
                                // Ujistěte se, že amount je platná hodnota
                                const validAmount = amount > 0 ? amount.toString() : "1";
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: { value: validAmount },
                                    }],
                                    application_context: { shipping_preference: 'NO_SHIPPING' }
                                });
                            }}
                            onApprove={handleApprove}
                        />
                    </PayPalScriptProvider>
                </Box>
            )}
        </Box>
    );
};

export default PayPalButton;