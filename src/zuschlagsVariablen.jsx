import { useState, useRef, useEffect } from "react";

export function Zuschlag({ name, wert, setWert }) {
  // entweder wert oder ein leeres feld
  const [saved, setSaved] = useState(wert !== "");
  const wrapperRef = useRef(null)
  const inputRef = useRef(null);
  const euroEinheit = ['std. Lohn', 'tageszuschlag'];

const lower = name.toLowerCase();

const einheit =
  lower.includes("std. lohn") || lower.includes("tageszuschlag")
    ? " €"
    : " %";

 

  function wertSpeichern() {
    localStorage.setItem(name, wert);
    console.log(`${name}:`, wert);
    setSaved(true);
  }

    // ➜ Wenn Edit-Modus aktiv wird → Input automatisch markieren
  useEffect(() => {
    if (!saved && inputRef.current) {
      // Timeout ist wichtig, sonst ist der Fokus manchmal zu früh
      setTimeout(() => {
        inputRef.current.select();
      }, 0);
    }
  }, [saved]);

  // ➜ Click-Outside zum Schließen
  useEffect(() => {
    function handleClickOutside(e) {
      if (!saved && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        wertSpeichern();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [saved, wert]);


  return (
    <div className="input" ref={wrapperRef}>
      
        {saved ? (
        
          <p className="zuschlag" onClick={()=> setSaved(false)}>
            <span className='zuschlagsGrund'>{name}:</span>
            <span className="button-design zuschlagSize">{wert} {einheit}</span>{" "}
          </p>
          ):(
            <form
            className="zuschlag "
            onSubmit={(e) =>{
              e.preventDefault();
              wertSpeichern();
            }}
          
          >
        
            <label htmlFor={name} className="zuschlagsGrund">{name}: </label>
            
              <input
              
              ref={inputRef}
              autoFocus
              type="number"
              id={name}
              className="button-design zuschlagSize input-form "
              placeholder={einheit}
              value={wert}
              onChange={(e) => setWert(e.target.value)}
              required
            />
            </form>
        )}
      </div>
    
  );
}
