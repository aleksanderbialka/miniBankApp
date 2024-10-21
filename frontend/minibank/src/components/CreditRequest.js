import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreditRequest() {
  const { id } = useParams();
  const [amount, setAmount] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleCreditRequest = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    try {
      await axios.post('http://127.0.0.1:8000/api/accounts/loan-application/', {
        account_id: id,
        amount,
        monthly_income: monthlyIncome,
        address,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    
      setSuccess('Wniosek o kredyt został pomyślnie złożony!');
      setError(null);
      
      setTimeout(() => {
        navigate(`/accounts/${id}`);
      }, 2000);
      
    } catch (err) {
      setError('Wniosek o kredyt nie powiódł się. Spróbuj ponownie.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Złóż wniosek o kredyt</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleCreditRequest}>
        <div className="mb-3">
          <label className="form-label">Kwota kredytu:</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Miesięczne dochody:</label>
          <input
            type="number"
            className="form-control"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Miejsce zamieszkania:</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Złóż wniosek</button>
      </form>
      <div className="mt-4">
      <Link to={`/accounts/${id}`} className="btn btn-outline-secondary"> Powrót do szczegółów konta</Link>
      </div>
    </div>
  );
}

export default CreditRequest;
