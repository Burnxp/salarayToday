import { useState } from "react";
import { calculateNightShiftMinutes } from "./nachtSchicht";
import { useFeiertage } from "./feierTage";
import { ResultView } from "./result";
import { calculateFeinPlanZuschlag } from "./feinPlanzuschlag";
import { useZuschlaege } from "./hooks/useZuschlaege";
import { useEffect } from "react";

import { useNavigate } from 'react-router-dom';



     

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

export function Rechner() {
  const {
    stdLohn,
    sonntagszuschlag,
    feiertagszuschlag,
    nachtzuschlag,
    feinplanzuschlag,
    nachtzeitenStart,
    nachtzeitenEnd
  } = useZuschlaege();
  const today = new Date().toISOString().split("T")[0];
  

 
  // States
  const [inputValue, setInputValue] = useState(today);
  const [schicht, setSchicht] = useState("frueh");
  const [startTime, setStartTime] = useState("05:30");
  const [endTime, setEndTime] = useState("13:45");
  const [result, setResult] = useState(null);

  // Feiertage laden für das Jahr des ausgewählten Datums
  const feiertage = useFeiertage(inputValue ? new Date(inputValue).getFullYear() : new Date().getFullYear());

  const [feinPlanChecked, setFeinPlanChecked] = useState(false);
  const [feinPlanHalfChecked, setFeinPlanHalfChecked] = useState(false);

  const [pause, setPause] = useState(false);

  

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

  const handleSchichtChange = (selected) => {
    
    console.log("Ausgewählte Schicht:", selected);
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
  
   // Prüfen ob der Tag ein Feiertag ist
    if (feiertage.includes(inputValue)) {
    if (endTime < startTime){
      // schicht geht aus den Feiertag raus
      feiertagsStd = (1440 - start) / 60;
      console.log(feiertagsStd)
      feiertagsZuschlag = feiertagsStd * parseFloat(stdLohn || 0) * (parseFloat(feiertagszuschlag || 0)/100);
      
    }
    if (startTime < endTime) {
          feiertagsZuschlag = arbeitszeitStunden * parseFloat(stdLohn || 0) * (parseFloat(feiertagszuschlag || 0)/100);
    feiertagsStd = arbeitszeitStunden;
    }

      }



    // Prüfen ob morgen ein Feiertag ist
    const morgenFeiertag = new Date(inputValue);
    morgenFeiertag.setDate(morgenFeiertag.getDate() + 1);
    const morgenFeiertagStr = morgenFeiertag.toISOString().split('T')[0];
    console.log('Morgen Feiertag:', morgenFeiertagStr);
    const morgenIstFeiertag = feiertage.includes(morgenFeiertagStr);
    console.log('Morgen ist Feiertag:', morgenIstFeiertag);
// Wenn morgen ein Feiertag ist und die Schicht über Mitternacht geht
  if (morgenIstFeiertag && endTime < startTime) {
    const minNachMitternacht = end; // Minuten nach Mitternacht
          feiertagsZuschlag =
            (minNachMitternacht / 60) *
            parseFloat(stdLohn || 0) *
            (parseFloat(feiertagszuschlag || 0) / 100); // Zuschlag nur für Stunden nach Mitternacht
          console.log("Feiertagszuschlag:", feiertagsZuschlag, end);
          feiertagsStd = minNachMitternacht / 60;
          gesamtLohn += feiertagsZuschlag;
          
  }
 

  gesamtLohn += sonntagsZuschlag + feiertagsZuschlag;

  let nachtstunden = calculateNightShiftMinutes(
    startTime, endTime, inputValue, nachtzeitenStart, nachtzeitenEnd, morgenIstFeiertag === true, feiertage.includes(inputValue)
  );


    if (feiertage.includes(inputValue) && weekday(inputValue) === 'Samstag'){
      // Es ist Feiertag und morgen ist Sonntag deshalb werden keine Nachtschichten gezahlt
      console.log('Es ist: ' + feiertage.includes(inputValue) + ' Samstag')
      nachtstunden = 0;
  }
  let nachtZuschlag = nachtstunden * parseFloat(stdLohn || 0) * (parseFloat(nachtzuschlag || 0)/100);
  gesamtLohn += nachtZuschlag;

  const feinPlanZuschlag = calculateFeinPlanZuschlag(feinPlanChecked, feinPlanHalfChecked, parseFloat(feinplanzuschlag || 0));
  gesamtLohn += feinPlanZuschlag;

  // Pause abziehen
  if (pause) {
    
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




const navigate = useNavigate();
  return (


/* Schicht-Container */
    <><div className="lohnrechner-layout ">

   <div className="flex-lohnDaten">
  <div className="aktLohndaten">
    <h2>Lohndaten:</h2>
    Std. Lohn: {localStorage.getItem("stdLohn")} € <br />
    Nachtzuschlag: {localStorage.getItem("Nachtzuschlag")} % <br />
    Sonntagszuschlag: {localStorage.getItem("Sonntagszuschlag")} % <br />
    Feiertagszuschlag: {localStorage.getItem("Feiertagszuschlag")} % <br />
    Feinplanzuschlag: {localStorage.getItem("Feinplanzuschlag")} € <br />
  </div>

  <div className="lohnDatenAendernContainer">
    <button
      className="button-design"
      onClick={() => navigate("/einstellungen")}
    >
      Lohndaten ändern
    </button>
  </div>
</div>

      
  <div className="schicht-grid">
      <h2 className="schicht-text">Schicht</h2>
      
<div className="schicht-button-container">
  <button
    onClick={() => handleSchichtChange('frueh')}
    className={`schicht-button ${schicht === 'frueh' ? 'aktiv' : ''}`}
  >
    Früh
  </button>

  <button
    onClick={() => handleSchichtChange('spaet')}
    className={`schicht-button ${schicht === 'spaet' ? 'aktiv' : ''}`}
  >
    Spät
  </button>

  <button
    onClick={() => handleSchichtChange('nacht')}
    className={`schicht-button ${schicht === 'nacht' ? 'aktiv' : ''}`}
  >
    Nacht
  </button>
</div>
</div>

      
      
{/* Worktime */}
<div className="arbeitszeit">
    <div className="arbeitszeit-container">
      
        <h2 className="arbeitszeit-ueberschrift">Arbeitszeit</h2>
        <span className="datum-text">Datum:</span>
        <input type="date" 
        className="arbeitsDatum button-design" 
        value={inputValue} 
        onChange={dateHandleChange} 
        />
        <span className="arbeitszeit-text">Zeit:</span>
        <input 
        type="time" 
        className="time-von button-design"
        value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />{" "} 

        <span 
        className="bis-text">bis</span>

        <input 
        type="time" 
        className="time-bis button-design"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
        />
</div> </div>
<div> <div>
  <div className="pause-tageszuschlag">
      <div className="pause-container">
        
          <div className="pause-flex">
                  <label htmlFor="" className="pause-text" >Pause <span className="smal-text">(unbezahlt 30min)</span></label>
        
   <label className="pause-checkbox">
    <input 
    type="checkbox" 
    checked={pause} 
    onChange={(e) => setPause(e.target.checked)}/>
    {/* dein Checkbox-SVG */}
    <svg
      className="checkbox-unchecked"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect
        x={1}
        y={1}
        width={18}
        height={18}
        fill="#BCE6B9"
        stroke="#0B3309"
        strokeWidth={3}
      />
    </svg>
    {/* dein Haken-SVG */}
    <svg
      className="check"
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={29}
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M5.56067 12.9076L1.06067 8.40762L6.06067 13.4076L15.5607 0.907623"
        stroke="#0B3309"
        strokeWidth={3}
      />
    </svg>
  </label>
      </div>
        </div>

    <div className={`tageszuschlag ${parseFloat(feinplanzuschlag || 0) > 0 ? "visible" : "hidden"}`}>
      <label className="tageszuschlag-label">Tageszuschlag:</label>
    
    <span className="tageszuschlag-wert">1</span>
    <div className="checkbox-tageszuschlag">
    <label className="pause-checkbox">
    <input type="checkbox" 
    checked={feinPlanChecked}
    onChange={(e) => {
      setFeinPlanChecked(e.target.checked);
      if (e.target.checked) setFeinPlanHalfChecked(false);
    }}
    />
    {/* dein Checkbox-SVG */}
    <svg
      className="checkbox-unchecked"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect
        x={1}
        y={1}
        width={18}
        height={18}
        fill="#BCE6B9"
        stroke="#0B3309"
        strokeWidth={3}
      />
    </svg>
    {/* dein Haken-SVG */}
    <svg
      className="check"
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M5.56067 12.9076L1.06067 8.40762L6.06067 13.4076L15.5607 0.907623"
        stroke="#0B3309"
        strokeWidth={3}
      />
    </svg>
  </label>
    </div>


    <span className="tageszuschlag-wert2">&frac12;</span>
    <div className="checkbox-tageszuschlag2">
    <label className="checkbox-tageszuschlag2">
    <input type="checkbox" 
    checked={feinPlanHalfChecked}
    onChange={(e) => {
      setFeinPlanHalfChecked(e.target.checked);
      if (e.target.checked) setFeinPlanChecked(false);
    }}
    />
    {/* dein Checkbox-SVG */}
    <svg
      className="checkbox-unchecked"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect
        x={1}
        y={1}
        width={18}
        height={18}
        fill="#BCE6B9"
        stroke="#0B3309"
        strokeWidth={3}
      />
    </svg>
    {/* dein Haken-SVG */}
    <svg
      className="check"
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M5.56067 12.9076L1.06067 8.40762L6.06067 13.4076L15.5607 0.907623"
        stroke="#0B3309"
        strokeWidth={3}
      />
    </svg>
  </label>
    </div>
    
      
 </div>
 </div>
</div> </div>
<div>
    <div>
      <div className="button-berechnung">
        <button className="berechnen-button" onClick={berechneLohn}>Berechnen</button>
      </div>
      </div>
      
    </div>
      <div className="resultContainer">
        <ResultView result={result} />
      </div>
      <div>
      
    
     
<div className="danke ">
      <h6 >Freut mich, dass du die App nutzt! Wenn dir die Arbeit dahinter gefällt, 
    kannst du mit einer kleinen Spende dazu beitragen, sie weiter zu verbessern.</h6>
        <a
    className="button-design coffeeButton"
    href="https://www.paypal.com/ncp/payment/5HVJVN7YTS8WL"
    target="_blank"
    rel="noopener noreferrer"
  >
    ☕ Jetzt unterstützen!
  </a> </div>
  
 </div>


        {/* <!-- Feedback Form --> */}
<form name="feedback" data-netlify="true" hidden>
  <input type="hidden" name="form-name" value="feedback" />
  <textarea name="message" defaultValue="" hidden />
</form>
              
    </div>

    </>

  );
}


