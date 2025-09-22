import { useState } from "react";


const hourToMin = (time) => {
  // time.split(':') es wird h und min als String gespeichert. 
  // Durch .map(number) wird jeder String in eine Zahl umgewandelt um damit arbeiten zu können!
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function Rechner({stdLohn}) {
  const [schicht, setSchicht] = useState("frueh"); // ausgewählte Schicht
  const [startTime, setStartTime] = useState("05:30");
  const [endTime, setEndTime] = useState("13:45");

  const [result, setResult] = useState(null);

  const zeiten = {
    frueh: { start: "05:30", ende: "13:45" },
    spaet: { start: "13:30", ende: "21:45" },
    nacht: { start: "21:30", ende: "05:45" },
  };

  // Handler für Schichtwahl
  function handleSchichtChange(event) {
    const selected = event.target.value;
    setSchicht(selected);
    if (zeiten[selected]) {
      setStartTime(zeiten[selected].start);
      setEndTime(zeiten[selected].ende);
    }
  }

  const berechneLohn = () => {
    const start = hourToMin(startTime)
    const end = hourToMin(endTime)

    let diff = end - start;
    if (diff < 0) diff += 24*60;


    const arbeitszeitStunden = diff / 60;

    const lohn = arbeitszeitStunden * parseFloat(stdLohn || 0);
  setResult({
    arbeitszeit: arbeitszeitStunden.toFixed(2),
    lohn: lohn.toFixed(2),
  });
  console.log(result)
  };

  return (
    <>
    <div>
      <p>Schicht:</p>
      <label>
        <input
          type="radio"
          name="schicht"
          value="frueh"
          checked={schicht === "frueh"}
          
          onChange={handleSchichtChange}
        />
        Früh
      </label>
      <label>
        <input
          type="radio"
          name="schicht"
          value="spaet"
          checked={schicht === "spaet"}
          onChange={handleSchichtChange}
        />
        Spät
      </label>
      <label>
        <input
          type="radio"
          name="schicht"
          value="nacht"
          checked={schicht === "nacht"}
          onChange={handleSchichtChange}
        />
        Nacht
      </label>

      <p>
        Arbeitszeit:{" "}
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
        /> <br />
        <button
          onClick={berechneLohn}
        >Berechnen</button>
      </p>
      {result && (
        <div>
          <p>Arbeitszeit: {result.arbeitszeit} Stunden</p>
          <p>Lohn: {result.lohn} €</p>
        </div>
      )}
      </div>
</>

    )
    
}
