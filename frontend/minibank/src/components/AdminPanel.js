import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loanApplications, setLoanApplications] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin-panel/users/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setSuccess(null);
    } catch (err) {
      setError('Nie udało się pobrać listy użytkowników.');
    }
  };

  const fetchLoanApplications = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin-panel/loans/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoanApplications(response.data);
      setSuccess(null);
    } catch (err) {
      setError('Nie udało się pobrać wniosków kredytowych.');
    }
  };

  const handleBlockUser = async (userId) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.patch(`http://127.0.0.1:8000/api/admin-panel/users/${userId}/block/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, is_active: !user.is_active } : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      setError('Nie udało się zmienić stanu użytkownika.');
    }
  };

  const handleApproveLoan = async (loanId) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.patch(`http://127.0.0.1:8000/api/admin-panel/loans/${loanId}/`, { status: 'Approved' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Wniosek kredytowy został zaakceptowany.');
      fetchLoanApplications();
    } catch (err) {
      setError('Nie udało się zaakceptować wniosku kredytowego.');
    }
  };

  const handleRejectLoan = async (loanId) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.patch(`http://127.0.0.1:8000/api/admin-panel/loans/${loanId}/`, { status: 'Rejected' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Wniosek kredytowy został odrzucony.');
      fetchLoanApplications();
    } catch (err) {
      setError('Nie udało się odrzucić wniosku kredytowego.');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLoanApplications();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Panel Administratora</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="mb-4">
        <Link to="/dashboard" className="btn btn-secondary">Powrót do panelu użytkownika</Link>
      </div>

      <h3 className="mb-4">Lista użytkowników</h3>
      {users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nazwa użytkownika</th>
              <th>Email</th>
              <th>Status</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.is_active ? 'Aktywny' : 'Zablokowany'}</td>
                <td>
                  <button
                    onClick={() => handleBlockUser(user.id)}
                    className={`btn ${user.is_active ? 'btn-danger' : 'btn-success'} btn-sm`}
                  >
                    {user.is_active ? 'Zablokuj' : 'Odblokuj'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="lead">Brak użytkowników.</p>
      )}

      <h3 className="mt-5 mb-4">Wnioski kredytowe</h3>
      {loanApplications.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nazwa użytkownika</th>
              <th>Kwota</th>
              <th>Status</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {loanApplications.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.user?.username ?? 'N/A'}</td>
                <td>{loan.amount} PLN</td>
                <td>
                  {loan.status === 'Approved' ? 'Zaakceptowany' : loan.status === 'Rejected' ? 'Odrzucony' : 'Oczekujący'}
                </td>
                <td>
                  {loan.status === 'Pending' && (
                    <>
                      <button onClick={() => handleApproveLoan(loan.id)} className="btn btn-success btn-sm me-2">Akceptuj</button>
                      <button onClick={() => handleRejectLoan(loan.id)} className="btn btn-danger btn-sm">Odrzuć</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="lead">Brak wniosków kredytowych.</p>
      )}
    </div>
  );
}

export default AdminPanel;
