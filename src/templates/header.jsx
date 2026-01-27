import LRLogo from '../assets/lohnrechner-logo.svg';
import FeedbackForm from '../feedbackForm';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();







  return (
  <header className='header'>
    <div className="grid">
      <div className="container1">
        <img src={LRLogo} alt="Lohnrechner Logo" onClick={() => window.location.href='/'}/>
      </div>
      <div className="container2">
        <div className="container1" />
        <div className="container2" />
        <div className="container3" />
        <div className="container4">
          <Link className="link" to="/datenschutz">
            Datenschutz
          </Link>
        </div>
        <div className="container5" />
        <div className="container6">
          <Link className="link" to="/impressum">
            Impressum
          </Link>
        </div>
        <div className="container7">
           <button className="feedbackButton button-design" onClick={() => setShowForm(true)}>
            Feedback
          </button>
          {showForm && <FeedbackForm onClose={() => setShowForm(false)} />}
        </div>
        <div className="container8">
                     <button
      className="hilfeButton button-design"
      onClick={() => navigate("/hilfe")}
    >
      Hilfe
    </button>
        </div>
        <div className="container9" />

        <div className="container10" />

      </div>
    </div>
  </header>
    );
}