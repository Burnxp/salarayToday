import { useEffect } from "react";

import "./feedbackform.css";
import "./header.css";
import "./text.css";


export default function FeedbackForm({ onClose }) {
  
  useEffect(() => {

    // Beim Öffnen des Formulars die Elemente ausblenden
    hiddenElements();
    return () => {
      // Beim Schließen des Formulars die Elemente wieder einblenden
      displayElements();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    await fetch("/", {
      method: "POST",
      body: formData,
    });

    alert("Danke für dein Feedback!");
    e.target.reset();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Feedback senden</h2>

        {/* Das ist das entscheidende Stück */}
        <form
          name="feedback"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          {/* Dieses Hidden-Input ist Pflicht */}
          <input type="hidden" name="form-name" value="feedback" />

          <label>
            Nachricht:
            <textarea name="message" required></textarea>
          </label>

          <button type="submit">Senden</button>
        </form>
      </div>
    </div>
  );
}



function hiddenElements() {
  document
    .querySelector('.lohnrechner-layout')
    ?.classList.add('hidden');

  document
    .querySelector('.text, .einstellungen-layout')
    ?.classList.add('hidden');
}

function displayElements() {
  document
    .querySelector('.lohnrechner-layout')
    ?.classList.remove('hidden');

  document
    .querySelector('.text, .einstellungen-layout')
    ?.classList.remove('hidden');
}

