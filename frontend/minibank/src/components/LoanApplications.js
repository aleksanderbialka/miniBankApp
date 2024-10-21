import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function LoanApplications() {
  const [loanApplications, setLoanApplications] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    const fetchLoanApplications = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setError('Brak tokena uwierzytelniającego. Zaloguj się ponownie.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/accounts/loan-applications/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoanApplications(response.data);
      } catch (err) {
        setError('Nie udało się pobrać wniosków o kredyt.');
      }
    };

    fetchLoanApplications();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Twoje wnioski o kredyt</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loanApplications.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Kwota kredytu</th>
              <th>Miesięczne dochody</th>
              <th>Adres</th>
              <th>Status</th>
              <th>Data złożenia</th>
            </tr>
          </thead>
          <tbody>
            {loanApplications.map((application) => (
              <tr key={application.id}>
                <td>{application.amount} PLN</td>
                <td>{application.monthly_income} PLN</td>
                <td>{application.address}</td>
                <td>{application.status}</td>
                <td>{new Date(application.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="lead">Brak złożonych wniosków o kredyt.</p>
      )}

      <div className="mt-4">
      <Link to={`/accounts/${id}`} className="btn btn-outline-secondary"> Powrót do szczegółów konta</Link>
      </div>
    </div>
  );
}

export default LoanApplications;
