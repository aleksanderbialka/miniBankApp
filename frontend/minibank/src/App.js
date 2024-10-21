import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import AccountDetails from './components/AccountDetails';
import Transfer from './components/Transfer';
import TransactionHistory from './components/TransactionHistory';
import CreditRequest from './components/CreditRequest';
import UserDetails from './components/UserDetails';
import Blik from './components/Blik';
import AdminPanel from './components/AdminPanel';
import Contact from './components/Contact'; 
import LoanApplications from './components/LoanApplications';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div className="appContainer">
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/accounts/:id" element={<PrivateRoute><AccountDetails /></PrivateRoute>} />
          <Route path="/accounts/:id/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
          <Route path="/accounts/:id/history" element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />
          <Route path="/accounts/:id/credit-request" element={<PrivateRoute><CreditRequest /></PrivateRoute>} />
          <Route path="/user-details" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
          <Route path="/accounts/blik/:id" element={<PrivateRoute><Blik /></PrivateRoute>} />
          <Route path="/admin-panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
          <Route path="/accounts/:id/loan-applications" element={<PrivateRoute><LoanApplications /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;