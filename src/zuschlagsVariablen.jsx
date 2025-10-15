import { useState } from "react";

export function Zuschlag({ name, wert, setWert }) {
  const [saved, setSaved] = useState(wert !== "");
  
  const einheit = name.toLowerCase().includes("feinplanzuschlag") ? " €" : " %";

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
        {saved ? (
          <>
            {name}: <span className="zuschlagStyle">{wert} {einheit}</span>{" "}
            <button onClick={wertAendern}>{name} ändern</button>
          </>
        ) : (
          <>
            <label htmlFor={name}>{name} {einheit}</label>
            <input
              type="number"
              id={name}
              className="inputfeld"
              value={wert}
              onChange={(e) => setWert(e.target.value)}
            />
            <button onClick={wertSpeichern}>Speichern</button>
          </>
        )}
      </p>
    </div>
  );
}
