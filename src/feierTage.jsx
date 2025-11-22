import { useState, useEffect } from "react";

export function useFeiertage(year) {
  const [feiertage, setFeiertage] = useState([]);

  useEffect(() => {
    async function fetchFeiertage() {
      try {
        const resp = await fetch(
          `https://feiertage-api.de/api/?jahr=${year}&nur_land=BY`
        );
        const data = await resp.json();
        
        // data ist ein Objekt mit Feiertagen → wir holen nur die Datumswerte
        const tage = Object.values(data).map(f => f.datum); 

        // Himmelfahrt ist in Bayreuth kein Feiertag deshalb wird er hier entfernt wird
        tage.splice(9,1); 
        
        // Neujahr year + 1 hinzufügen
        tage.push(`${year + 1}-01-01`); 
        console.log(tage)
        
        setFeiertage(tage); // ["2025-01-01", "2025-01-06", ...]
        console.log("Feiertage geladen", tage);

      } catch (err) {
        console.error("Feiertage laden fehlgeschlagen", err);
      }
    }
    fetchFeiertage();
  }, [year]);

  return feiertage;
}

