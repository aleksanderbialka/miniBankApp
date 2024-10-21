import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function UserDetails() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (err) {
      setError('Nie udało się pobrać danych użytkownika.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    try {
      await axios.patch('http://127.0.0.1:8000/api/users/profile/', {
        username: username,
        email: email,
        ...(password && { password: password }),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Dane użytkownika zostały pomyślnie zaktualizowane!');
      setError(null);

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Aktualizacja danych nie powiodła się. Spróbuj ponownie.');
      setSuccess(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dane użytkownika</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nazwa użytkownika:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Nowe hasło (opcjonalnie):</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Zaktualizuj dane</button>
      </form>

      <div className="mt-4">
        <Link to="/dashboard" className="btn btn-secondary w-100">Powrót do Dashboard</Link>
      </div>
    </div>
  );
}

export default UserDetails;
