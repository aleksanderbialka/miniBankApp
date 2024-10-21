import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TransactionHistory() {
  const { id } = useParams();
  const [sentTransactions, setSentTransactions] = useState([]);
  const [receivedTransactions, setReceivedTransactions] = useState([]);
  const [error, setError] = useState(null);

  const fetchSentTransactions = async () => {
    const token = localStorage.getItem('access_token');

    try {
      console.log(`Fetching sent transactions for account ID: ${id}`);
      const response = await axios.get('http://127.0.0.1:8000/api/transactions/sent/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Sent transactions:', response.data);
      setSentTransactions(response.data);
    } catch (err) {
      console.log('Error fetching sent transactions:', err);
      setError('Nie udało się pobrać wysłanych transakcji.');
    }
  };

  const fetchReceivedTransactions = async () => {
    const token = localStorage.getItem('access_token');

    try {
      console.log(`Fetching received transactions for account ID: ${id}`);
      const response = await axios.get('http://127.0.0.1:8000/api/transactions/received/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Received transactions:', response.data);
      setReceivedTransactions(response.data);
    } catch (err) {
      console.log('Error fetching received transactions:', err);
      setError('Nie udało się pobrać otrzymanych transakcji.');
    }
  };

  useEffect(() => {
    fetchSentTransactions();
    fetchReceivedTransactions();
  }, [id]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Historia transakcji</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <h3 className="mb-3">Wysłane transakcje:</h3>
      {sentTransactions.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Odbiorca</th>
              <th>Kwota</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {sentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.recipient_account}</td>
                <td>{transaction.amount} PLN</td>
                <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">Brak wysłanych transakcji.</p>
      )}

      <h3 className="mb-3">Otrzymane transakcje:</h3>
      {receivedTransactions.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nadawca</th>
              <th>Kwota</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {receivedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.sender_account}</td>
                <td>{transaction.amount} PLN</td>
                <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">Brak otrzymanych transakcji.</p>
      )}

      <div className="text-center mt-3">
      <Link to={`/accounts/${id}`} className="btn btn-outline-secondary"> Powrót do szczegółów konta</Link>
          </div>
    </div>
  );
}

export default TransactionHistory;
