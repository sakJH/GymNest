import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
    "client-id": "YOUR_CLIENT_ID_SANDBOX", // Sandbox client ID
    currency: "USD",
    intent: "capture",
    "data-client-token": "YOUR_CLIENT_TOKEN", // client token
}; //! move to env after creating paypal sandbox account

const PayPalButton = () => {
    const handleApprove = (data, actions) => {
        // logic here
        console.log("Platba byla úspěšná!", data, actions);
        return actions.order.capture();
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
        <h1>PayPal Platba</h1>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: "0.01", // Částka platby
                            },
                        }],
                    });
                }}
                onApprove={handleApprove}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;