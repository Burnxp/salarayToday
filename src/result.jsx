

export function ResultView({ result }) {
  if (!result) {
    return (
      <div className="container">
        <div className="box a button-design result-arbeitszeit">
      <span className="result-bezeichung">Arbeitszeit</span> 
      <span className="result-ergebnis">- Std</span>
      </div>
      <div className="box b button-design result-arbeitslohn">
        <span className="result-bezeichung">Arbeitslohn</span>
        <span className="result-ergebnis">- €</span>
        </div>
      <div className="box c button-design result-nachtzuschlag">
        <span className="result-bezeichung">Nachtzuschlag</span>
      <span className="result-ergebnis">- €</span>
      </div>
      <div className="box d button-design result-sonntagszuschlag">
        <span className="result-bezeichung">Sonntagszuschlag</span>
      <span className="result-ergebnis">- €</span>
      </div>
      <div className="box e button-design result-feiertagszuschlag">
        <span className="result-bezeichung">Feiertagszuschlag</span>
      <span className="result-ergebnis">- €</span>
      </div>
      <div className="box f button-design result-zuschlaegeGes">
        <span className="result-bezeichung">Zuschläge Gesamt</span>
      <span className="result-ergebnis">- €</span>
      </div>
      <div className="box g button-design result-lohn-m-Zuschlaege">
        <span className="result-bezeichung">Lohn m. Zuschlag</span>
      <span className="result-ergebnis">- €</span>
      </div>

        </div>

    );
  }

  return (
     (
        <div className="container">
         <div className="box a button-design result-arbeitszeit">
      <span className="result-bezeichung">Arbeitszeit</span>
      <span className="result-ergebnis">{result.arbeitszeit?? '-'} Std</span>
      </div>
      <div className="box b button-design result-arbeitslohn">
        <span className="result-bezeichung">Arbeitslohn</span>
        <span className="result-ergebnis">{result.arbeitsZeitLohn ?? '-'} €</span>
        </div>
      <div className="box c button-design result-nachtzuschlag">
        <span className="result-bezeichung">Nachtzuschlag</span>
      <span className="result-ergebnis">{result.nachtZuschlag ?? '-'} €</span>
      </div>
      <div className="box d button-design result-sonntagszuschlag">
        <span className="result-bezeichung">Sonntagszuschlag</span>
      <span className="result-ergebnis">{result.sonntagsZuschlag ?? '-'} €</span>
      </div>
      <div className="box e button-design result-feiertagszuschlag">
        <span className="result-bezeichung">Feiertagszuschlag</span>
      <span className="result-ergebnis">{result.feierTagZuschlag ?? '-'} €</span>
      </div>
      <div className="box f button-design result-zuschlaegeGes">
        <span className="result-bezeichung">Zuschläge Gesamt</span>
      <span className="result-ergebnis">{result.gesamtZuschlaege ?? '-'} €</span> 
      </div>
      <div className="box g button-design result-lohn-m-Zuschlaege">
        <span className="result-bezeichung">Lohn m. Zuschlag</span>
      <span className="result-ergebnis">{result.gesamtLohn ?? '-'} €</span>
      </div>
        </div>

          
      )
    
  );
}
