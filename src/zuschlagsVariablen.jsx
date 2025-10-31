import { useState } from "react";

export function Zuschlag({ name, wert, setWert }) {
  const [saved, setSaved] = useState(wert !== "");
  
  const einheit = name.toLowerCase().includes("feinplanz") ? " €" : " %";
 

  function wertSpeichern() {
    localStorage.setItem(name, wert);
    console.log(`${name}:`, wert);
    setSaved(true);
  }

  function wertAendern() {
    setSaved(false);
    setWert("");
  }

  return (
    <div className="input">
      <p className="zuschlag">
        {saved ? (<>
          
            {name}: <span className="zuschlagStyle">{wert} {einheit}</span>{" "}
            <button className="zuschlaegeAendernButton" onClick={wertAendern}>bearbeiten</button>
          </>
        ) : (
          <>
            <label htmlFor={name} className="zuschlaegeAendernLabel">{name} </label>
            <span ><input
              autoFocus
              type="number"
              id={name}
              className="inputZuschlag"
              placeholder={einheit}
              value={wert}
              onChange={(e) => setWert(e.target.value)}
              required
            /></span>
            <button className="zuschlaegeAendernButton" onClick={wertSpeichern}>Speichern</button>
          </>
        )}
      </p>
    </div>
  );
}
