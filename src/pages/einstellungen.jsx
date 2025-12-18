
import { href } from "react-router-dom";
import { useZuschlaege } from "../hooks/useZuschlaege";
import { Zuschlag } from '../zuschlagsVariablen';
import { useState } from "react";
import { useEffect } from "react";


export function EinstellungenPage() {
    
  const {
    stdLohn,
    setStdLohn,
    sonntagszuschlag,
    setSonntagszuschlag,
    feiertagszuschlag,
    setFeiertagszuschlag,          
    nachtzuschlag,
    setNachtzuschlag,
    feinplanzuschlag,
    setFeinplanzuschlag,
    nachtzeitenStart,
    nachtzeitenEnd,   
    setNachtzeitenStart,
    setNachtzeitenEnd,
  } = useZuschlaege();

  return (
    useEffect(() => {
      document.title = "Einstellungen - Lohnrechner";
    }, []),


    <>
    <div className="text einstellungen-layout">
      <h2 className="einstellungen-schrift">Einstellungen</h2>
      


    <Zuschlag
    name= 'Std. Lohn'
    wert= {stdLohn}
    setWert = {setStdLohn} />
    
    <h2 className="einstellungen-schrift">Zuschläge</h2>

      <Zuschlag
        name="Sonntag"
        wert={sonntagszuschlag}
        setWert={setSonntagszuschlag}
      />

      <Zuschlag
        name="Feiertag"
        wert={feiertagszuschlag}
        setWert={setFeiertagszuschlag}
      />

      <Zuschlag
        name="Nachtzuschlag"
        wert={nachtzuschlag}
        setWert={setNachtzuschlag}
      />
      

      {/* Neue Eingaben für Nachtzeiten */}
      <div className="input">
        
          
          <div className="grid-nachtschicht">
            <h2 className="einstellungen-schrift">Nachtschichtzeiten:</h2>
          <span className="ns-start grid-item">Start:</span>
          <input
            
            type="time"
            value={nachtzeitenStart}
            className="zuschlaegeAendernButton grid-item3 button-design"
            onChange={(e) => setNachtzeitenStart(e.target.value)}
          />
          <br /> 
          <span className="ns-ende grid-item2">Ende:</span>
          <input
            type="time"
            className="zuschlaegeAendernButton grid-item4 button-design"
            value={nachtzeitenEnd}
            onChange={(e) => setNachtzeitenEnd(e.target.value)}
          />
        </div>
      </div>

    <h6>Zahlt deine Firma einen Zuschlag, wenn sich der Arbeitsplan innerhalb eines bestimmten Zeitraums ändert? </h6>

      <Zuschlag
        name="Tageszuschlag"
        wert={feinplanzuschlag}
        setWert={setFeinplanzuschlag}
      />
      <div className="danke">
      <h6 >Freut mich, dass du die App nutzt! Wenn dir die Arbeit dahinter gefällt, 
    kannst du mit einer kleinen Spende dazu beitragen, sie weiter zu verbessern.</h6>
        <a
    className="button-design coffeeButton"
    href="https://www.paypal.com/paypalme/bSchaller/2"
    target="_blank"
    rel="noopener noreferrer"
  >
    ☕ Jetzt unterstützen!
  </a>
      
      
  
      </div></div>
    
      

      
      



    </>
  );
}