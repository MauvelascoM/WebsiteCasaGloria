import React, { useEffect, useRef, useState } from 'react';
import api from '../services/api';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { bookingData } = useBooking();
  const paypalRef = useRef();
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { checkInDate, checkOutDate, guests, selectedRoom, optionalServices } = bookingData;
  const totalNights = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
  const roomCost = selectedRoom?.price * (1 - (4 - guests) * 0.08) || 0;
  const servicesCost =
    (optionalServices?.breakfast ? 10 : 0) +
    (optionalServices?.earlyCheckIn ? 15 : 0) +
    (optionalServices?.pets ? 20 : 0);
  const total = totalNights * roomCost + servicesCost;

  useEffect(() => {
    const loadPayPalScript = async () => {
      if (!window.paypal) {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=ASy9ZYVIHV0hygIMEwpoQrTexpzoGqlvkrNvTCbnRWMHSWB3G0Ln8x1BN2H-K3T85X7ozMTr8-977d1b`;
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
            navigate('/booking/confirmation');  // ✅ Redirect after payment
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
  }, [navigate, totalCost]);

  return (
    <div>
      <h2>Checkout</h2>
      <p><strong>Total:</strong> ${totalCost.toFixed(2)}</p>

      {paid ? (
        <p style={{ color: 'green' }}>✅ Payment successful! Redirecting...</p>
      ) : (
        <div ref={paypalRef}></div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
