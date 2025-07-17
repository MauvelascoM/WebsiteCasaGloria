import { Routes, Route } from 'react-router-dom';
import BookingStep1 from './BookingStep1';
import BookingStep2 from './BookingStep2';
import BookingStep3 from './BookingStep3';
import BookingStep4 from './BookingStep4';
import BookingStep5 from './BookingStep5';
import BookingConfirmation from './BookingConfirmation';

export default function BookingRoutes() {
  return (
    <Routes>
      <Route path="step1" element={<BookingStep1 />} />
      <Route path="step2" element={<BookingStep2 />} />
      <Route path="step3" element={<BookingStep3 />} />
      <Route path="step4" element={<BookingStep4 />} />
      <Route path="step5" element={<BookingStep5 />} />
      <Route path="confirmation" element={<BookingConfirmation />} />
    </Routes>
  );
}
