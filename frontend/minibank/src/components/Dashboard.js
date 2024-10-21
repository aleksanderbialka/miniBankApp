import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const fetchUserData = async () => {
    const token = localStorage.getItem('access_token');

    try {
      const userResponse = await axios.get('http://127.0.0.1:8000/api/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(userResponse.data);

      const accountsResponse = await axios.get('http://127.0.0.1:8000/api/accounts/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(accountsResponse.data);
    } catch (err) {
      setError('Nie udało się pobrać danych użytkownika.');
    }
  };

  const handleCreateAccount = async () => {
    const token = localStorage.getItem('access_token');

    try {
      await axios.post('http://127.0.0.1:8000/api/accounts/create/', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setSuccess('Konto zostało pomyślnie utworzone!');
      setError(null);
      fetchUserData();
    } catch (err) {
      setError('Nie udało się utworzyć konta.');
      setSuccess(null);
    }
  };

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
  
    if (!refreshToken) {
      setError('Brak tokena do wylogowania.');
      return;
    }
  
    try {
      await axios.post('http://127.0.0.1:8000/api/users/logout/', {
        refresh: refreshToken
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
  
      window.location.href = '/login';
    } catch (err) {
      setError('Wylogowanie nie powiodło się.');
    }
  };
  
  
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      
      <header className="bg-dark text-white p-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h4 mb-0">Panel użytkownika</h1>
          <nav className="d-flex align-items-center">
            <Link to="/user-details" className="btn btn-outline-light me-2">Edytuj dane użytkownika</Link>
            <Link to="/contact" className="btn btn-outline-light me-2">Dane kontaktowe</Link>
            <button onClick={handleCreateAccount} className="btn btn-primary me-2">Utwórz nowe konto</button>
            {userData && userData.is_superuser && (
            <Link to="/admin-panel" className="btn btn-warning me-2">Panel Administratora</Link>)}

            <button onClick={handleLogout} className="btn btn-danger">
              <i className="bi bi-box-arrow-right"></i> Wyloguj się
            </button>
          </nav>
        </div>
      </header>

      <div className="container">
        {userData ? (
            <h2 className="mb-4">Witaj, {userData.username}!</h2>
          ) : (
            <p>Ładowanie danych użytkownika...</p>
          )}
        <h2 className="mb-4">Twoje konta bankowe</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {accounts.length > 0 ? (
          <div className="row">
            {accounts.map(account => (
              <div key={account.id} className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Numer konta: {account.account_number}</h5>
                    <p className="card-text">Saldo: {account.balance} PLN</p>
                    <Link to={`/accounts/${account.id}`} className="btn btn-outline-primary">Szczegóły konta</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="lead">Nie masz żadnych kont bankowych.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
