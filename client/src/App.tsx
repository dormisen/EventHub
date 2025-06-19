import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import VerifyOrganization from './components/VerifyOrganization';
import Login from './pages/Login';
import VerifyEmail from './components/VerifyEmail';
import Profile from './pages/Profile';
import RegisterOrganization from './pages/RegisterOrganization';
import EventDashboard from './components/ODashboard';
import ProtectedRoute from './api/PrivateRoute';
import PrivateRoute from './api/PrivateRoute';
import { PaymentProcessing } from './components/PAY/PaymentProcessing';
import { PaymentSuccess } from './components/PAY/PaymentSuccess';
import Register from './pages/Register';
import EventDetailsPage from './components/EventDetails';
import Events from './pages/Events';
import OrgDashboard from './pages/OrgDashboard';
import ErrorBoundary from './api/ErrorBoundary';
import CreateEvent from './components/CreateEvent';
import PayPalReturnHandler from './components/PAY/PayPalReturnHandler';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        components: "buttons",
        disableFunding: "card" 
      }}
    >
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route
              path="/profile"
              element={
                <ErrorBoundary>
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                </ErrorBoundary>
              }
            />
             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
             <Route path="/paypal-return" element={<PayPalReturnHandler />} />
            <Route path="/event-dashboard" element={<PrivateRoute><EventDashboard /></PrivateRoute>} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/verify-organization" element={<VerifyOrganization />} />
            <Route path="/payment-processing" element={<PaymentProcessing />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
            <Route
              path="/event/:eventId"
              element={
                <ErrorBoundary>
                  <EventDetailsPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/organizer/dashboard"
              element={
                <ErrorBoundary>
                  <PrivateRoute>
                    <OrgDashboard />
                  </PrivateRoute>
                </ErrorBoundary>
              }
            />
            <Route path="/register-organization" element={<ProtectedRoute><RegisterOrganization /></ProtectedRoute>} />
          </Routes>
          <Footer />
          <ToastContainer position="bottom-right" />
        </AuthProvider>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;