import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Blik() {
  const { id } = useParams();  
  const [blikCode, setBlikCode] = useState('');
  const [error, setError] = useState(null);

  const fetchBlikCode = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/accounts/blik/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlikCode(response.data.blik_code);
    } catch (err) {
      setError('Nie udało się pobrać kodu BLIK.');
    }
  }, [id]);

  useEffect(() => {
    fetchBlikCode();

    const interval = setInterval(() => {
      fetchBlikCode();
    }, 120000);

    return () => clearInterval(interval);
  }, [fetchBlikCode]);  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Kod BLIK</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {!error && blikCode && (
                <div>
                  <p className="display-3"><strong>{blikCode}</strong></p>
                  <p className="text-muted">Ten kod wygasa za 2 minuty.</p>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mt-3">
            <Link to={`/accounts/${id}`} className="btn btn-outline-secondary">
              Powrót do szczegółów konta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blik;
