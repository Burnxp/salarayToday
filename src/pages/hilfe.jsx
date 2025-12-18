    
    import { useEffect } from "react";
    
    export function Hilfe() {
  useEffect(() => {
    document.title = "Lohnrechner - Hilfe";
  }, []);
    return (
<div className="text">
  <section className="hilfe">
    <h1>Hilfe</h1>
    <h2>Wie wird mein Stundenlohn berechnet?</h2>
    <p>
      <strong>Formel:</strong>
      <br />
      Monatsbrutto ÷ vertragliche Monatsarbeitszeit = Stundenlohn
    </p>
    <p>
      <em>Beispiel:</em> 2.500 € ÷ 160 h = 15,63 €/h
    </p>
    <p>Diese Zahl ist die Basis für Zuschlagsberechnungen.</p>
    <br />
    <h2>Welche Zuschläge sind steuerfrei?</h2>
    <p>Steuerlich gibt es Höchstsätze (Stand 2025):</p>
    <ul>
      <li>Nachtarbeit: 25 % (zwischen 20:00 – 6:00 Uhr)</li>
      <li>Nachtarbeit 0–4 Uhr (bei Schichtbeginn vor Mitternacht): 40 %</li>
      <li>Sonntagsarbeit: 50 %</li>
      <li>Feiertagsarbeit: 125 %</li>
      <li>
        Besondere Feiertage (z. B. 24.12. ab 14 Uhr, Weihnachten, 1. Mai): 150 %
      </li>
    </ul>
    <p>
      <strong>Achtung:</strong>
      <br />
      Alle Berechnungen sind Brutto!
    </p>
    <br />
    <h3>Zuschläge werden nicht kombiniert</h3>
    <p>
      Überschneiden sich Zuschläge (z. B. Nacht + Feiertag), gilt ausschließlich
      der höhere Wert. Der niedrigere Zuschlag entfällt.
    </p>
    <br />
    <h3>Steuerfreibeträge im Überblick</h3>
    <p>
      Für Zuschläge gelten nach § 3b EStG (Stand 2025) folgende steuerfreien
      Prozentsätze:
    </p>
    <table>
      <thead>
        <tr>
          <th>Art der Arbeit</th>
          <th>Steuerfreier Zuschlag</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nachtarbeit (20:00 – 6:00)</td>
          <td>25 %</td>
        </tr>
        <tr>
          <td>Nachtarbeit (0:00 – 4:00, Schichtbeginn vor 24 Uhr)</td>
          <td>40 %</td>
        </tr>
        <tr>
          <td>Sonntagsarbeit</td>
          <td>50 %</td>
        </tr>
        <tr>
          <td>Gesetzliche Feiertage</td>
          <td>125 %</td>
        </tr>
        <tr>
          <td>Besondere Feiertage (z. B. 24.12. ab 14 Uhr)</td>
          <td>150 %</td>
        </tr>
      </tbody>
    </table>
    <br />
    <h2>Wie speichere ich die App auf meinem Smartphone?</h2>
        <p>Auf den meisten Smartphones lässt sich die Anwendung wie eine normale App auf dem Startbildschirm speichern. Auf Android öffnet man dazu den Browser-Menüpunkt (⋮) und wählt „Zum Startbildschirm hinzufügen“. Unter iOS tippt man unten im Safari-Menü auf das Teilen-Symbol und anschließend auf „Zum Home-Bildschirm“. Danach erscheint die Anwendung als eigene App-Kachel, startet im Vollbild und lässt sich wie jede andere App öffnen.</p>
    <br />
    <h2>Hinweis / Haftungsausschluss</h2>
    <p>
      Alle Angaben erfolgen ohne Gewähr. Es kann keine Garantie für Richtigkeit,
      Vollständigkeit oder Aktualität übernommen werden. Die Berechnungen dienen
      zur Orientierung und ersetzen keine individuelle Beratung. Verbindlich
      sind Arbeitsvertrag, Tarifvertrag, betriebliche Regelungen und die
      Lohnabrechnung deines Arbeitgebers.
    </p>
    <p>
      <strong>Hinweis:</strong>
      <br />
      Wenn dir Fehler bei Berechnungen, Zeiten oder Zuschlägen auffallen, melde
      dich jederzeit über den Feedback-Button. Jede Rückmeldung hilft, die Anwendung weiter
      zu verbessern.
    </p>
  </section>
</div>

    )}