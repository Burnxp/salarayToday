import { useState, useRef } from "react";
import { calculateNightShiftMinutes } from "./nachtSchicht";
import { useFeiertage } from "./feierTage";

// Hilfsfunktion: Stunden und Minuten in Minuten umrechnen
const hourToMin = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

// Hilfsfunktion: Wochentag ermitteln
const weekday = (dateString) => {
  const days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  const today = new Date(dateString);
  return days[today.getDay()];
};

export function Rechner({ stdLohn }) {
  const today = new Date().toISOString().split("T")[0];
  const feiertage = useFeiertage(new Date().getFullYear());
  // States
  const [inputValue, setInputValue] = useState(today);
  const [schicht, setSchicht] = useState("frueh");
  const [startTime, setStartTime] = useState("05:30");
  const [endTime, setEndTime] = useState("13:45");
  const [result, setResult] = useState(null);

  const feinPlanRef = useRef(null);

  const zeiten = {
    frueh: { start: "05:30", ende: "13:45" },
    spaet: { start: "13:30", ende: "21:45" },
    nacht: { start: "21:30", ende: "05:45" },
  };

  // Handlers
  const dateHandleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    weekday(value);
  };

  const handleSchichtChange = (e) => {
    const selected = e.target.value;
    setSchicht(selected);
    if (zeiten[selected]) {
      setStartTime(zeiten[selected].start);
      setEndTime(zeiten[selected].ende);
    }
  };

  const berechneLohn = () => {
    const start = hourToMin(startTime);
    const end = hourToMin(endTime);

    let diff = end - start;
    if (diff < 0) diff += 24 * 60; // Wenn Tageswechsel

    const arbeitszeitStunden = diff / 60;

    let lohn = arbeitszeitStunden * parseFloat(stdLohn || 0);

    let sonntagsZuschlag = 0;
    let feiertagsZuschlag = 0;

    const sonntag = () => {
      if (weekday(inputValue) === "Sonntag") {
        // Sonntagszuschlag muss gezahlt werden!
        sonntagsZuschlag = arbeitszeitStunden * parseFloat(stdLohn || 0);
        lohn = lohn + sonntagsZuschlag; // Angenommen Zuschlag 100%
      } else {
        sonntagsZuschlag = 0;
      }
    };

    // 👉 Feiertags-Check
    if (feiertage.includes(inputValue)) {
      feiertagsZuschlag = arbeitszeitStunden * parseFloat(stdLohn || 0) * 1.75;
      lohn += feiertagsZuschlag;
    }

    let feinPlanZuschlag = 40;
    sonntag(inputValue);
    const nachtstunden = calculateNightShiftMinutes(
      startTime,
      endTime,
      inputValue
    );
    console.log("Nachtstunden:", nachtstunden);
    const nachtZuschlag = nachtstunden * (parseFloat(stdLohn) * 0.25); // angenommen 25% ns Zuschlag
    lohn += nachtZuschlag;
    if (feinPlanRef.current?.checked) {
      lohn += feinPlanZuschlag;
    } else {
      feinPlanZuschlag = 0;
    }

    const newResult = {
      arbeitszeit: arbeitszeitStunden.toFixed(2),
      lohn: lohn.toFixed(2),
      feinPlanZuschlag: feinPlanZuschlag,
      sonntagsZuschlag: sonntagsZuschlag,
      nachtZuschlag: nachtZuschlag,
      feierTagZuschlag: feiertagsZuschlag.toFixed(2),
    };
    setResult(newResult);
    console.log(newResult);
  };

  return (
    <div>
      <p>Schicht:</p>
      {["frueh", "spaet", "nacht"].map((s) => (
        <label key={s}>
          <input
            type="radio"
            name="schicht"
            value={s}
            checked={schicht === s}
            onChange={handleSchichtChange}
          />
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </label>
      ))}

      <div className="feinplanzuschlag">
        <label>
          Feinplanzuschlag:
          <input type="checkbox" ref={feinPlanRef} />
        </label>
      </div>

      <div className="workTime">
        <p>
          Arbeitszeit:
          <input type="date" value={inputValue} onChange={dateHandleChange} />
        </p>
        <div>Aktueller Input-Wert:{weekday(inputValue)}</div>

        <p>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />{" "}
          bis{" "}
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </p>

        <button onClick={berechneLohn}>Berechnen</button>
      </div>

      {result && (
        <div className="result flexbox">
          <p className="flexItem">Arbeitszeit Lohn: {result.lohn} €</p>
          <p className="flexItem">Arbeitszeit: {result.arbeitszeit} Stunden</p>
          <p className="flexItem">
            Nachtzuschlag: {result.nachtZuschlag || 0} €
          </p>
          <p className="flexItem">
            Sonntagszuschlag: {result.sonntagsZuschlag || 0} €
          </p>
          <p className="flexItem">
            Feiertagszuschlag: {result.feierTagZuschlag || 0} €
          </p>
          <p className="flexItem">
            Feinplanzuschlag: {result.feinPlanZuschlag} €
          </p>
        </div>
      )}
    </div>
  );
}
