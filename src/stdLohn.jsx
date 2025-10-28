import { useState } from "react"




export function StdLohn({ stdLohn, setStdLohn }){

    const [saved, setSaved] = useState(stdLohn !== "");

        function wertSpeichern() {
        localStorage.setItem('stdLohn', stdLohn);
        console.log('StdLohn', stdLohn);
        setSaved(true);  
    }

    function stdLohnAendern() {
        setSaved(false);
        setStdLohn("");
    }
    
    return (
            <>
          <div className="input">

    <p className="zuschlag">
        { saved ? ( 
            <>
                Std. Lohn: <span>{stdLohn} €</span>{" "}
                <button className="zuschlaegeAendernButton" onClick={stdLohnAendern}>Std Lohn ändern</button>
            </>


        ) : (
            <>
            <label htmlFor="stdLohn">Stundenlohn (Brutto)</label> <br/>
            <input 
            type="number" 
            id="stdLohn" 
            className="inputZuschlag"
            placeholder="€"
            value= {stdLohn} 
            onChange= {(e) => setStdLohn(e.target.value)}/> 
            <button className="zuschlaegeAendernButton" onClick={wertSpeichern}>Speichern</button>
            </>
        )}
      
    </p>
  </div>
    </>
    )

};
