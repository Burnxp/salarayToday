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

    <p className="stdLohn">
        { saved ? ( 
            <>
                Stundenlohn: <span>{stdLohn} €</span>{" "}
                <button onClick={stdLohnAendern}>Std Lohn ändern</button>
            </>


        ) : (
            <>
            <label htmlFor="stdLohn">Stundenlohn (Brutto)</label>
            <input 
            type="number" 
            id="stdLohn" 
            className="inputfeld"
            value= {stdLohn} 
            onChange= {(e) => setStdLohn(e.target.value)}/>
            <button onClick={wertSpeichern}>Speichern</button>
            </>
        )}
      
    </p>
  </div>
    </>
    )

};
