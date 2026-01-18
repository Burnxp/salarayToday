import { useEffect } from "react";

export default function Datenschutz() {
  useEffect(() => {
    document.title = "Schichtlohnrechner - Datenschutzerklärung";
  }, []);
  return (

<div className="text" >
    

    
      <h1>Datenschutzerklärung</h1>

      <p>
        Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO):
      </p>

      <div>
        <p><strong>BS-WebDev</strong></p>

        <p>Deutschland</p>
        <p>E-Mail: <a href="mailto:kontakt@bs-webdev.de" >kontakt@bs-webdev.de</a></p>
      </div>

      <h2>1. Allgemeines</h2>
      <p>
        Diese Webanwendung (<strong>schichtlohnrechner.netlify.app</strong> bzw. <strong>schichtlohnrechner.de</strong>) dient der Berechnung von Löhnen mit Zuschlägen.
        Sie kann ohne Registrierung genutzt werden.
      </p>

      <h4>2. Datenspeicherung im Browser</h4>
      <p>
        Zur Speicherung von Einstellungen (z. B. Zuschläge, Zeiten) wird ausschließlich der <strong>Local Storage</strong>
        des Webbrowsers verwendet. Diese Daten verbleiben lokal auf dem Gerät und werden nicht an Server übertragen.
      </p>

      <h4 >3. Hosting & Serverlogs</h4>
      <p>
        Diese Anwendung wird auf <strong>Netlify</strong> gehostet.
        Beim Aufruf der Seite werden automatisch technische Daten (z. B. IP-Adresse, Zeitpunkt, Browsertyp)
        vom Hosting-Anbieter verarbeitet, um den sicheren Betrieb zu gewährleisten.
        Weitere Informationen finden Sie in der Datenschutzerklärung von Netlify:{" "}
        <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" >
          www.netlify.com/privacy
        </a>.
      </p>

      <h4>4. Keine Cookies oder Tracking</h4>
      <p>
        Diese Anwendung verwendet keine Cookies, kein externes Tracking (z. B. Google Analytics) und keine Werbedienste.
      </p>

      <h4>5. Rechte der Nutzer</h4>
      <p>
        Nutzer haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
        ihrer personenbezogenen Daten. Da die App selbst keine personenbezogenen Daten speichert,
        betrifft dies im Wesentlichen die automatisch erfassten technischen Daten durch den Hosting-Anbieter.
      </p>

      <h4>6. Änderungen dieser Datenschutzerklärung</h4>
      <p>
        Diese Datenschutzerklärung kann bei Bedarf angepasst werden, wenn gesetzliche oder technische Änderungen erfolgen.
      </p>

      <p >Stand: Oktober 2025</p>
    </div>
  );
}
