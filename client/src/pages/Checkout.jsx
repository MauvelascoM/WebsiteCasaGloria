import React, { useEffect, useRef, useState } from 'react';
import { useBooking } from '../context/BookingContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function BookingCheckout() {
  const { bookingData, setBookingData } = useBooking();
  const paypalRef = useRef();
  const navigate = useNavigate();

  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  const [paid, setPaid] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  const [error, setError] = useState('');

  const { checkInDate, checkOutDate, guests, selectedRoom, optionalServices } = bookingData;

  const totalNights = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
  const roomCost = selectedRoom?.price * (1 - (4 - guests) * 0.08) || 0;
  const servicesCost =
    (optionalServices?.breakfast ? 10 : 0) +
    (optionalServices?.earlyCheckIn ? 15 : 0) +
    (optionalServices?.pets ? 20 : 0);
  const total = totalNights * roomCost + servicesCost;

  const handleGuestChange = (e) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };

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
            await api.post('/paypal/capture-order', { orderID: data.orderID });

     

                  const payload = {
  checkInDate: bookingData.checkInDate,
  checkOutDate: bookingData.checkOutDate,
  guests: bookingData.guests,
  selectedRoom: bookingData.selectedRoom,
  guest: guestInfo,
  paymentMethod: 'Card/Paypal'
};

            const res = await api.post('/bookings', payload);

            setPaid(true);
            setBookingData({ ...bookingData, bookingId: res.data.bookingId });
            navigate('/booking/confirmation');
          } catch (err) {
            console.error(err);
            setError('Payment completed but failed to save booking.');
          }
        },
        onError: (err) => {
          console.error(err);
          setError('PayPal checkout error.');
        }
      }).render(paypalRef.current);
    };

    loadPayPalScript();
  }, []); 

  return (
    <div className="checkout-page">
      <h2>Step 5: Guest Info & Payment</h2>

      <div className="guest-form">
        <input name="fullName" placeholder="Full Name" onChange={handleGuestChange} />
        <input name="email" placeholder="Email" onChange={handleGuestChange} />
        <input name="phone" placeholder="Phone" onChange={handleGuestChange} />
        <input name="address" placeholder="Address" onChange={handleGuestChange} />
      </div>

      <h3>Total: ${total.toFixed(2)}</h3>

      {paid ? (
        <div>
          <p style={{ color: 'green' }}>✅ Booking confirmed!</p>
        </div>
      ) : (
        <div ref={paypalRef}></div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
