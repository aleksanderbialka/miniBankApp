import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Transfer() {
  const [amount, setAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [senderAccountId, setSenderAccountId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); 

  const fetchSenderAccount = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/accounts/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSenderAccountId(response.data.id);
    } catch (err) {
      setError('Nie udało się pobrać danych konta nadawcy.');
    }
  };

  
  const fetchRecipientAccountId = async (recipientAccountNumber) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/accounts/all/`, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const foundAccount = response.data.find(
        (account) => account.account_number === recipientAccountNumber
      );
      if (foundAccount) {
        return foundAccount.id; 
      } else {
        setError('Nie znaleziono konta odbiorcy o podanym numerze.');
        return null;
      }
    } catch (err) {
      setError('Nie udało się znaleźć konta odbiorcy.');
      return null;
    }
  };

  useEffect(() => {
    fetchSenderAccount(); 
  }, [id]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    
    const recipientId = await fetchRecipientAccountId(recipientAccount);
    if (!recipientId) return; 

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/transactions/create/',
        {
          sender: senderAccountId, 
          recipient: recipientId,
          amount: amount, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess('Przelew został pomyślnie zrealizowany!');
      setError(null);
      setTimeout(() => {
        navigate(`/accounts/${id}`);
      }, 2000);
    } catch (err) {
      setError('Przelew nie powiódł się. Sprawdź dane i spróbuj ponownie.');
      setSuccess(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Nowy przelew</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleTransfer} className="transferForm">
        <div className="mb-3">
          <label htmlFor="recipientAccount" className="form-label">Numer konta odbiorcy:</label>
          <input
            type="text"
            id="recipientAccount"
            className="form-control"
            value={recipientAccount}
            onChange={(e) => setRecipientAccount(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Kwota:</label>
          <input
            type="number"
            id="amount"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Wykonaj przelew</button>
      </form>

      <div className="text-center mt-3">
        <Link to={`/accounts/${id}`} className="btn btn-outline-secondary">
          Powrót do szczegółów konta
        </Link>
      </div>
    </div>
  );
}

export default Transfer;
