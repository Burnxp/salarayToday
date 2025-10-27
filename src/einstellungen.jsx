import { StdLohn } from "./stdLohn";
import { useZuschlaege } from "./hooks/useZuschlaege";
import { Zuschlag } from './zuschlagsVariablen';
import { use, useState } from "react";
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
      <h2>Einstellungen</h2>
    <StdLohn stdLohn={stdLohn} setStdLohn={setStdLohn} />
      <Zuschlag
        name="Sonntagszuschlag"
        wert={sonntagszuschlag}
        setWert={setSonntagszuschlag}
      />

      <Zuschlag
        name="Feiertagszuschlag"
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
        <p className="zuschlag">
          Nachtschichtzeiten:
          <br />
          Start:
          <input
            type="time"
            value={nachtzeitenStart}
            onChange={(e) => setNachtzeitenStart(e.target.value)}
          />
          &nbsp; Ende:
          <input
            type="time"
            value={nachtzeitenEnd}
            onChange={(e) => setNachtzeitenEnd(e.target.value)}
          />
        </p>
      </div>
    <h6>Zahlt die Firma einen Zuschlag, wenn sich der Arbeitsplan innerhalb eines bestimmten Zeitraums ändert? </h6>
      <Zuschlag
        name="Feinplanzuschlag"
        wert={feinplanzuschlag}
        setWert={setFeinplanzuschlag}
      />
    </>
  );
}