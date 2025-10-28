import { useState, useRef } from "react";
import { calculateNightShiftMinutes } from "./nachtSchicht";
import { useFeiertage } from "./feierTage";
import { ResultView } from "./result";
import { calculateFeinPlanZuschlag } from "./feinPlanzuschlag";
import { useZuschlaege } from "./hooks/useZuschlaege";
import { useEffect } from "react";



     

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

export function Rechner({stdLohn}) {
  const {
    sonntagszuschlag,
    feiertagszuschlag,
    nachtzuschlag,
    feinplanzuschlag,
    nachtzeitenStart,
    nachtzeitenEnd
  } = useZuschlaege();
  const today = new Date().toISOString().split("T")[0];
  const feiertage = useFeiertage(new Date().getFullYear());
  // States
  const [inputValue, setInputValue] = useState(today);
  const [schicht, setSchicht] = useState("frueh");
  const [startTime, setStartTime] = useState("05:30");
  const [endTime, setEndTime] = useState("13:45");
  const [result, setResult] = useState(null);

const [feinPlanChecked, setFeinPlanChecked] = useState(false);
const [feinPlanHalfChecked, setFeinPlanHalfChecked] = useState(false);

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
  if (diff < 0) diff += 24 * 60; // Tageswechsel

  let arbeitszeitStunden = diff / 60;
  let arbeitsZeitLohn = arbeitszeitStunden * parseFloat(stdLohn || 0);
  let gesamtLohn = arbeitsZeitLohn;

  // Zuschläge nur berechnen, wenn sie > 0
  let sonntagsZuschlag = 0, sonntagsStd = 0;
  let feiertagsZuschlag = 0, feiertagsStd = 0;

  if (weekday(inputValue) === "Sonntag") {
    
     
      // Sonntagszuschlag berechnen 
        if (endTime < startTime) {
          // Schicht geht über Mitternacht
          const minutesBeforeMidnight = hourToMin("24:00") - start; // Minuten vor Mitternacht
          sonntagsStd = minutesBeforeMidnight / 60;
          sonntagsZuschlag =
            sonntagsStd *
            parseFloat(stdLohn || 0) *
            (parseFloat(sonntagszuschlag || 0) / 100);
            console.log("Sonntagszuschlag für Stunden vor Mitternacht:", sonntagsZuschlag);

        }

        // komplette Stunden am Sonntag
        if (startTime < endTime) {
          // Sonntagszuschlag muss gezahlt werden!
          sonntagsZuschlag =
            arbeitszeitStunden *
            parseFloat(stdLohn || 0) *
            (parseFloat(sonntagszuschlag || 0) / 100);
          sonntagsStd = arbeitszeitStunden;
        }
        gesamtLohn += sonntagsZuschlag;
      
      
    
    
    console.log('Sonntag Zuschlag:', sonntagsZuschlag);
  }
  if (weekday(inputValue) === "Samstag") {
        console.log("Samstag gearbeitet, kein Sonntagszuschlag");
        if (endTime < startTime) {
          // Schicht geht über Mitternacht
          console.log("Schicht geht über Mitternacht! Sonntagszuschlag berechnen.");
          const minNachMitternacht = end; // Minuten nach Mitternacht
          sonntagsZuschlag =
            (minNachMitternacht / 60) *
            parseFloat(stdLohn || 0) *
            (parseFloat(sonntagszuschlag || 0) / 100); // Zuschlag nur für Stunden nach Mitternacht
          console.log("Sonntagszuschlag:", sonntagsZuschlag, end);
          gesamtLohn += sonntagsZuschlag;
          sonntagsStd = minNachMitternacht / 60;
        }
      }

  if (feiertage.includes(inputValue)) {
    feiertagsZuschlag = arbeitszeitStunden * parseFloat(stdLohn || 0) * (parseFloat(feiertagszuschlag || 0)/100);
    feiertagsStd = arbeitszeitStunden;
  }
 

  gesamtLohn += sonntagsZuschlag + feiertagsZuschlag;

  let nachtstunden = calculateNightShiftMinutes(
    startTime, endTime, inputValue, nachtzeitenStart, nachtzeitenEnd
  );
  let nachtZuschlag = nachtstunden * parseFloat(stdLohn || 0) * (parseFloat(nachtzuschlag || 0)/100);
  gesamtLohn += nachtZuschlag;

  const feinPlanZuschlag = calculateFeinPlanZuschlag(feinPlanChecked, feinPlanHalfChecked, parseFloat(feinplanzuschlag || 0));
  gesamtLohn += feinPlanZuschlag;

  // Pause abziehen
  if (pause.current?.checked) {
    
    // 30 Minuten Pause abziehen
    const abzug = 0.5; // 30 min
    console.log('arbeitszeitStunden vor Pause:', arbeitszeitStunden, arbeitsZeitLohn, nachtstunden, sonntagsStd, feiertagsStd);
    arbeitszeitStunden -=  abzug;
    arbeitsZeitLohn = arbeitszeitStunden * parseFloat(stdLohn || 0);
    
    if (nachtstunden > 4) nachtstunden -= abzug;
    if (sonntagsStd > 4) sonntagsStd -= abzug;
    if (feiertagsStd > 4) feiertagsStd -= abzug;
    console.log(nachtstunden, sonntagsStd, feiertagsStd);
    
    
    sonntagsZuschlag = sonntagsStd > 0 ? sonntagsStd * parseFloat(stdLohn || 0) * (parseFloat(sonntagszuschlag || 0)/100) : 0;
    feiertagsZuschlag = feiertagsStd > 0 ? feiertagsStd * parseFloat(stdLohn || 0) * (parseFloat(feiertagszuschlag || 0)/100) : 0;
    nachtZuschlag = nachtstunden > 0 ? nachtstunden * parseFloat(stdLohn || 0) * (parseFloat(nachtzuschlag || 0)/100) : 0;

  }
let gesamtZuschlaege = 0;
  gesamtZuschlaege = sonntagsZuschlag + feiertagsZuschlag + nachtZuschlag + feinPlanZuschlag;
  console.log('sonntagsZuschlag', sonntagsZuschlag);
  console.log('feiertagsZuschlag', feiertagsZuschlag);
  console.log('nachtZuschlag', nachtZuschlag);
  console.log('feinPlanZuschlag', feinPlanZuschlag);
  /* console.log('gesamtZuschlaege', gesamtZuschlaege);  */ 
  gesamtLohn = arbeitsZeitLohn + gesamtZuschlaege;
  console.log(gesamtLohn);
  setResult({
    arbeitszeit: arbeitszeitStunden.toFixed(2),
    arbeitsZeitLohn: arbeitsZeitLohn.toFixed(2),
    sonntagsZuschlag: sonntagsZuschlag.toFixed(2),
    feierTagZuschlag: feiertagsZuschlag.toFixed(2),
    nachtZuschlag: nachtZuschlag.toFixed(2),
    feinPlanZuschlag: feinPlanZuschlag.toFixed(2),
    gesamtZuschlaege: gesamtZuschlaege.toFixed(2),
    gesamtLohn: gesamtLohn.toFixed(2)
  });
};


  return (
    useEffect(() => {
      document.title = "Lohnrechner - SalaryDay";
    }, []),
    <div>
      <hr />
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

      <div className={`feinplanzuschlag ${parseFloat(feinplanzuschlag || 0) > 0 ? "visible" : "hidden"}`}>
        <label>
          Feinplanzuschlag{" "}
          <span className="smal">(Komplett oder &frac12;)</span>: <br />
          1:
         <input
  type="checkbox"
  checked={feinPlanChecked}
  onChange={(e) => {
    setFeinPlanChecked(e.target.checked);
    if (e.target.checked) setFeinPlanHalfChecked(false);
  }}
/>
1/2:
<input
  type="checkbox"
  checked={feinPlanHalfChecked}
  onChange={(e) => {
    setFeinPlanHalfChecked(e.target.checked);
    if (e.target.checked) setFeinPlanChecked(false);
  }}
  
/> 
        </label> 
      </div> <br />
      <div className="pause">
        <label>
          Pause (unbezahlt 30 Min):
          <input type="checkbox" ref={pause} />
        </label>
      </div>

      <div className="workTime">
        <p>
          Arbeitszeit:
          <input type="date" value={inputValue} onChange={dateHandleChange} />
        </p>

        <p className="workTime">
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
<hr />
      <ResultView result={result} />
    </div>
  );
}


