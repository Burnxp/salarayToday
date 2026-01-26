import LRLogo from '../assets/lohnrechner-logo.svg';
import FeedbackForm from '../feedbackForm';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    // passenden Scroll-Container für aktuelle Route holen
    const scrollContainer =
      document.querySelector(".lohnrechner-layout") ||
      document.querySelector(".einstellungen-layout") ||
      document.querySelector(".text");

    const headerGrid = document.querySelector(".grid");
    if (!scrollContainer || !headerGrid) return;

    const onScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      if (scrollTop > 0) {
        headerGrid.classList.add("grid-smal");
              document.documentElement.style.setProperty(
        "--content-offset",
        "4rem"
      );
      } else {
        headerGrid.classList.remove("grid-smal");
        document.documentElement.style.setProperty(
        "--content-offset",
        "7.75rem"
        );
      }
    };

    scrollContainer.addEventListener("scroll", onScroll);

    // beim Route-Wechsel oder Unmount wieder sauber entfernen
    return () => {
      scrollContainer.removeEventListener("scroll", onScroll);
    };
  }, [location.pathname]); // Effekt läuft neu bei jedem Seitenwechsel





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