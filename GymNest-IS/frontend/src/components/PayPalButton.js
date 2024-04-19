// PayPalButton.js
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button, Typography, Box } from '@mui/material';

const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD", //TODO - změnit na preferedCurrncy z User DB
    intent: "capture",
};

const subscriptionOptions = [
    { duration: "1 měsíc = 10USD", value: "10.00" },
    { duration: "6 měsíců = 50USD", value: "50.00" },
    { duration: "1 rok = 90USD", value: "90.00" }
];

/**
 * A React component for rendering a PayPal button and handling user interactions.
 *
 * * card testing: https://developer.paypal.com/api/rest/sandbox/card-testing/#link-creditcardgeneratorfortesting
 *
 * @return {JSX.Element} The PayPalButton component
 */
const PayPalButton = () => {
    const [selectedAmount, setSelectedAmount] = useState("");
    const [isSubscriptionSelected, setIsSubscriptionSelected] = useState(false);

    const handleApprove = (data, actions) => {
        console.log("Platba byla úspěšná!", data, actions);
        return actions.order.capture();
    };

    const handleSubscriptionSelect = (value) => {
        setSelectedAmount(value);
        setIsSubscriptionSelected(true);
    };

    return (
        <Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 2
		}}>
            <Typography variant="h4">Vyber si délku předplatného</Typography>
            <Box>
                {subscriptionOptions.map((option, index) => (
                    <Button variant="outlined" key={index} onClick={() => handleSubscriptionSelect(option.value)} sx={{ margin: 1 }}>
                        {option.duration}
                    </Button>
                ))}
            </Box>
            {isSubscriptionSelected && (
                <Box maxWidth="400px" width="100%">
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={{ layout: "vertical", tagline: false }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: { value: selectedAmount },
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