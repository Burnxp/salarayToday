import { StdLohn } from "./stdLohn";
import { useZuschlaege } from "./hooks/useZuschlaege";
import { Zuschlag } from './zuschlagsVariablen';
import { useState } from "react";
import { useEffect } from "react";


export function EinstellungenPage() {
    const [stdLohn, setStdLohn] = useState(localStorage.getItem("stdLohn") || "10");
  const {
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
      document.title = "Einstellungen - SalaryDay";
    }, []),

    <>
      <h2 >Einstellungen</h2>
      <hr />
    <StdLohn stdLohn={stdLohn} setStdLohn={setStdLohn} />
    <hr />
    <h3>Zuschläge</h3>

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
        name="Nachtzu."
        wert={nachtzuschlag}
        setWert={setNachtzuschlag}
      />
      

      {/* Neue Eingaben für Nachtzeiten */}
      <div className="input">
        <p >
          Nachtschichtzeiten:
          <br />
          Start:
          <input
            type="time"
            value={nachtzeitenStart}
            className="zuschlaegeAendernButton"
            onChange={(e) => setNachtzeitenStart(e.target.value)}
          />
          &nbsp; Ende:
          <input
            type="time"
            className="zuschlaegeAendernButton"
            value={nachtzeitenEnd}
            onChange={(e) => setNachtzeitenEnd(e.target.value)}
          />
        </p>
      </div>

    <h6>Zahlt die Firma einen Zuschlag, wenn sich der Arbeitsplan innerhalb eines bestimmten Zeitraums ändert? </h6>

      <Zuschlag
        name="Feinplanz."
        wert={feinplanzuschlag}
        setWert={setFeinplanzuschlag}
      />
    </>
  );
}