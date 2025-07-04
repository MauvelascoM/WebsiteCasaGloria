import React, { useEffect, useRef, useState } from 'react';
import api from '../services/api';

export default function Checkout() {
  const paypalRef = useRef();
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);

  const total = 100; // You can make this dynamic (e.g., based on selected room)

  useEffect(() => {
    const loadPayPalScript = async () => {
      if (!window.paypal) {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=ASy9ZYVIHV0hygIMEwpoQrTexpzoGqlvkrNvTCbnRWMHSWB3G0Ln8x1BN2H-K3T85X7ozMTr8-977d1b`; // ← replace this in production
        script.addEventListener('load', renderPayPalButtons);
        document.body.appendChild(script);
      } else {
        renderPayPalButtons();
      }
    };

    const renderPayPalButtons = () => {
      window.paypal.Buttons({
        createOrder: async () => {
          const res = await api.post('/paypal/create-order', { total });
          return res.data.id;
        },
        onApprove: async (data) => {
          try {
            const res = await api.post('/paypal/capture-order', { orderID: data.orderID });
            setPaid(true);
          } catch (err) {
            setError('Payment failed during capture.');
          }
        },
        onError: (err) => {
          console.error(err);
          setError('PayPal checkout error.');
        },
      }).render(paypalRef.current);
    };

    loadPayPalScript();
  }, []);

  return (
    <div>
      <h2>Checkout</h2>
      <p><strong>Total:</strong> ${total.toFixed(2)}</p>

      {paid ? (
        <p style={{ color: 'green' }}>✅ Payment successful!</p>
      ) : (
        <div ref={paypalRef}></div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
