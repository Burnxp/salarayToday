import { useState, useRef } from "react";
import { calculateNightShiftMinutes } from "./nachtSchicht";
import { useFeiertage } from "./feierTage";
import { ResultView } from "./result";

function pauseAbzug() {
        if (nachtstunden > 4) {
          nsStd = nsStd - 0.5;
        }
      
        if (sonntagsStunden > 4) {
          soStd = soStd - 0.5;
        }
      
        if (feiertagsStunden > 4) {
          feiTagStd = feiTagStd - 0.5;
        }
      
        if (samstagMittagStd > 4) {
          samstagMittagStd = samstagMittagStd - 0.5;
        }
      
        arbeitszeitStunden = arbeitszeitStunden - 0.5;
      
        pause.checked = false;
}     
     

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

export function Rechner({
  stdLohn,
  sonntagszuschlag,
  feiertagszuschlag,
  nachtzuschlag,
  feinplanzuschlag,
}) {
  const today = new Date().toISOString().split("T")[0];
  const feiertage = useFeiertage(new Date().getFullYear());
  // States
  const [inputValue, setInputValue] = useState(today);
  const [schicht, setSchicht] = useState("frueh");
  const [startTime, setStartTime] = useState("05:30");
  const [endTime, setEndTime] = useState("13:45");
  const [result, setResult] = useState(null);

  const feinPlanRef = useRef(null);
  const feinPlanRefHalf = useRef(null);
  const pause = useRef(null);
  // const pause = useRef(null); // Wird noch hinzugefügt

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

    let arbeitsZeitLohn = arbeitszeitStunden * parseFloat(stdLohn || 0);
    let gesamtLohn = arbeitsZeitLohn;
    let sonntagsZuschlag = 0;
    let feiertagsZuschlag = 0;
    const gesamtLohnPlus = (zuschlag) => gesamtLohn + zuschlag;

    const sonntag = () => {
      if (weekday(inputValue) === "Sonntag") {
        if (endTime < startTime) {
          // Schicht geht über Mitternacht
          const minutesBeforeMidnight = hourToMin("24:00") - start; // Minuten vor Mitternacht
          sonntagsZuschlag =
            (minutesBeforeMidnight / 60) *
            parseFloat(stdLohn || 0) *
            (parseFloat(sonntagszuschlag || 0) / 100);
        }
        if (startTime < endTime) {
          // Sonntagszuschlag muss gezahlt werden!
          sonntagsZuschlag =
            arbeitszeitStunden *
            parseFloat(stdLohn || 0) *
            (parseFloat(sonntagszuschlag || 0) / 100);
          console.log("Sonntagszuschlag:", sonntagszuschlag);
        }
        gesamtLohn = gesamtLohnPlus(sonntagsZuschlag);
      } else {
        sonntagsZuschlag = 0;
      }
      if (weekday(inputValue) === "Samstag") {
        if (endTime < startTime) {
          // Schicht geht über Mitternacht
          const minNachMitternacht = end; // Minuten nach Mitternacht
          sonntagsZuschlag =
            (minNachMitternacht / 60) *
            parseFloat(stdLohn || 0) *
            (parseFloat(sonntagszuschlag || 0) / 100); // Zuschlag nur für Stunden nach Mitternacht
          console.log("Sonntagszuschlag:", sonntagsZuschlag, end);
          gesamtLohn = gesamtLohnPlus(sonntagsZuschlag);
        }
      }
    };

    // 👉 Feiertags-Check
    if (feiertage.includes(inputValue)) {
      feiertagsZuschlag =
        arbeitszeitStunden *
        parseFloat(stdLohn || 0) *
        (feiertagszuschlag / 100); //
      console.log("Feiertagszuschlag:", feiertagsZuschlag);
      gesamtLohn = gesamtLohnPlus(feiertagsZuschlag);
    }

    sonntag(inputValue);
    const nachtstunden = calculateNightShiftMinutes(
      startTime,
      endTime,
      inputValue
    );
    console.log("Nachtstunden:", nachtstunden);
    const nachtZuschlag =
      nachtstunden * (parseFloat(stdLohn) * (nachtzuschlag / 100)); // angenommen 25% ns Zuschlag
    gesamtLohn = gesamtLohnPlus(nachtZuschlag);
    let feinPlanZuschlag = 0;

    // Wurde Feinplanzuschlag angehakt?
    if (feinPlanRef.current?.checked) {
      // sicherstellen, dass feinplanzuschlag als Zahl behandelt wird
      feinPlanZuschlag = parseFloat(feinplanzuschlag || 0);
      gesamtLohn = gesamtLohnPlus(feinPlanZuschlag);
    }
    if (feinPlanRefHalf.current?.checked) {
      feinPlanZuschlag = parseFloat(feinplanzuschlag || 0) / 2;
      gesamtLohn = gesamtLohnPlus(feinPlanZuschlag);
    }

    if (pause.current?.checked) {
      // 30 Minuten Pause abziehen
      pauseAbzug()
    }

    const gesamtZuschlaege =
      sonntagsZuschlag + feiertagsZuschlag + nachtZuschlag + feinPlanZuschlag;
    const newResult = {
      arbeitszeit: arbeitszeitStunden.toFixed(2),
      arbeitsZeitLohn: arbeitsZeitLohn.toFixed(2),
      feinPlanZuschlag: feinPlanZuschlag.toFixed(2),
      sonntagsZuschlag: sonntagsZuschlag.toFixed(2),
      nachtZuschlag: nachtZuschlag.toFixed(2),
      feierTagZuschlag: feiertagsZuschlag.toFixed(2),
      gesamtLohn: gesamtLohn.toFixed(2),
      gesamtZuschlaege: gesamtZuschlaege.toFixed(2),
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
          Feinplanzuschlag{" "}
          <span className="smal">(Komplett oder &frac12;)</span>: <br />
          1:
          <input name="feinPlan" type="checkbox" ref={feinPlanRef} />
          &nbsp; &frac12;:
          <input name="feinPlan" type="checkbox" ref={feinPlanRefHalf} />
        </label>
      </div>
      <div className="pause">
        <label>
          Pause (unbezahlt 30 Min): (wird noch hinzugefügt ... )
          {/* <input type="checkbox" ref={pause} /> */}
        </label>
      </div>

      <div className="workTime">
        <p>
          Arbeitszeit:
          <input type="date" value={inputValue} onChange={dateHandleChange} />
        </p>

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

      <ResultView result={result} />
    </div>
  );
}
