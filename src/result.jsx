

export function ResultView({ result }) {
    if (!result) return null; // wenn noch kein result gib 0 zurück!

  return (
     (
        <div className="result flexbox">
          <p className="flexItem">Arbeitszeit Lohn: {result.arbeitsZeitLohn} €</p>
          <p className="flexItem">Arbeitszeit: {result.arbeitszeit} Stunden</p>
          <p className="flexItem">
            Nachtzuschlag: {result.nachtZuschlag || 0} €
          </p>
          <p className="flexItem">
            Sonntagszuschlag: {result.sonntagsZuschlag || 0} €
          </p>
          <p className="flexItem">
            Feiertagszuschlag: {result.feierTagZuschlag || 0} €
          </p>

          <p className="flexItem">
            Lohn mit Zuschlägen: {result.gesamtLohn || 0} €
          </p>
          <p className="flexItem">
            Zuschläge - Gesamt: {result.gesamtZuschlaege || 0} €
          </p>
        </div>
      )
    
  );
}
