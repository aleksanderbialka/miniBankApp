import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { FaMoneyCheckAlt, FaHistory, FaQrcode, FaMoneyBillWave, FaFileInvoiceDollar, FaArrowLeft } from 'react-icons/fa';

function AccountDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);

  const fetchAccountData = async () => {
    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/accounts/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccountData(response.data);
    } catch (err) {
      setError('Nie udało się pobrać danych konta.');
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Szczegóły konta</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && accountData && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Numer konta: {accountData.account_number}</h5>
            <p className="card-text">Saldo: {accountData.balance} PLN</p>
            <p className="card-text">Data utworzenia: {new Date(accountData.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      <div className="row text-center">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <FaMoneyCheckAlt size={40} className="mb-3"/>
              <h5 className="card-title">Nowy przelew</h5>
              <p className="card-text">Wyślij przelew do innego użytkownika.</p>
              <Link to={`/accounts/${id}/transfer`} className="btn btn-primary">Nowy przelew</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <FaHistory size={40} className="mb-3"/>
              <h5 className="card-title">Historia transakcji</h5>
              <p className="card-text">Sprawdź swoje ostatnie transakcje.</p>
              <Link to={`/accounts/${id}/history`} className="btn btn-primary">Zobacz historię</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <FaQrcode size={40} className="mb-3"/>
              <h5 className="card-title">Generuj kod BLIK</h5>
              <p className="card-text">Wygeneruj kod BLIK do płatności.</p>
              <Link to={`/accounts/blik/${id}`} className="btn btn-primary">Generuj BLIK</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <FaMoneyBillWave size={40} className="mb-3"/>
              <h5 className="card-title">Złóż wniosek o kredyt</h5>
              <p className="card-text">Aplikuj o kredyt bankowy.</p>
              <Link to={`/accounts/${id}/credit-request`} className="btn btn-primary">Złóż wniosek</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <FaFileInvoiceDollar size={40} className="mb-3"/>
              <h5 className="card-title">Zobacz wnioski kredytowe</h5>
              <p className="card-text">Sprawdź swoje złożone wnioski kredytowe.</p>
              <Link to={`/accounts/${id}/loan-applications`} className="btn btn-primary">Zobacz wnioski</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
          <FaArrowLeft className="me-2" /> Wróć do panelu użytkownika
        </button>
      </div>
    </div>
  );
}

export default AccountDetails;
