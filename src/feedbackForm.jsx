import "./feedbackform.css";

export default function FeedbackForm({ onClose }) {
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
