import { NavigationsBar } from "./navigation"; 


// App-Container erzeugen, falls nicht vorhanden
if (!document.getElementById("app")) {
    const appDiv = document.createElement("div");
    appDiv.id = "app";
    document.body.appendChild(appDiv);
}   
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("app"));

root.render(    
    <>
    <h2>
        Hier können in kürze Einstellungen vorgenommen werden.
        Höhe der Zuschläge.

        Nachtschichtzuschlag, Feiertagszuschlag, Sonntagszuschlag, 
        Stundenzuschläge,....
    </h2>
        <NavigationsBar />
    </>
) ;