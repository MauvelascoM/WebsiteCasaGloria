import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    selectedRoom: null,
    optionalServices: {
      breakfast: false,
      earlyCheckIn: false,
      pets: false
    },
    guestInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: ''
    },
    paymentMethod: 'onArrival'
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
