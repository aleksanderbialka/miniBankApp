import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Contact() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dane kontaktowe</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>GitHub:</strong> <a href="https://github.com/aleksanderbialka" target="_blank" rel="noopener noreferrer">https://github.com/aleksanderbialka</a>
        </li>
        <li className="list-group-item">
          <strong>LinkedIn:</strong> <a href="https://pl.linkedin.com/in/aleksander-bia%C5%82ka-194969282" target="_blank" rel="noopener noreferrer">https://pl.linkedin.com/in/aleksander-bia%C5%82ka-194969282</a>
        </li>
        <li className="list-group-item">
          <strong>Email:</strong> <a href="mailto:aleksander.bialka@icloud.com">aleksander.bialka@icloud.com</a>
        </li>
      </ul>
      <button onClick={() => window.history.back()} className="btn btn-secondary mt-4">Wstecz</button>
    </div>
  );
}

export default Contact;
