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
                <button className="zuschlaegeAendernButton" onClick={stdLohnAendern}>bearbeiten</button>
            </>


        ) : (
            <>
            <label className="zuschlaegeAendernLabel" htmlFor="stdLohn">Std. Lohn:</label> 
            <span>
                <input 
            autoFocus
            type="number" 
            id="stdLohn" 
            className="inputZuschlag"
            placeholder="€"
            value= {stdLohn} 
            onChange= {(e) => setStdLohn(e.target.value)}/> 
            </span>
            <button className="zuschlaegeAendernButton" onClick={wertSpeichern}>Speichern</button>
            </>
        )}
      
    </p>
  </div>
    </>
    )

};
