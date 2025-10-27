import { useEffect } from "react";

export default function Impressum() {
  useEffect(() => {
    document.title = "Impressum - SalaryDay";
  }, []);

  return (
    <div>
      <h1>Impressum</h1>

      <p>
        Angaben gemäß § 5 Telemediengesetz (TMG)
      </p>

      <div >
        <p><strong>BS-WebDev</strong></p>
        <p>Deutschland</p>
      </div>

      <div >
        <>
          <strong>Kontakt:</strong><br />
          E-Mail: <a href="mailto:kontakt@bs-webdev.de" >kontakt@bs-webdev.de</a>
        </>
      </div>

      <div>
        <p>
          Diese Website ist ein privat betriebenes Projekt ohne kommerzielle Absicht.
          Alle Berechnungen erfolgen lokal im Browser des Nutzers.
        </p>
      </div>
    </div>
  );
}
