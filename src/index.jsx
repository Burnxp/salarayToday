
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Rechner } from './logik';
import { EinstellungenPage } from './einstellungen';
import { useZuschlaege } from "./hooks/useZuschlaege";

import {NavigationsBar} from './navigation';
import { useState } from "react";

// App-Container erzeugen, falls nicht vorhanden
if (!document.getElementById("app")) {
  const appDiv = document.createElement("div");
  appDiv.id = "app";
  document.body.appendChild(appDiv);
}



function LohnrechnerPage() {
  const [stdLohn, setStdLohn] = useState(localStorage.getItem("stdLohn") || "10");
  const {sonntagszuschlag,
    feiertagszuschlag,
    nachtzuschlag,
    feinplanzuschlag,
    nachtzeitenStart,
    nachtzeitenEnd,
  } = useZuschlaege();
    const [pause] = useState(localStorage.getItem("Pause") || "");
  
  return (
    <>
      
      <Rechner 
      stdLohn={stdLohn} 
      sonntagszuschlag={sonntagszuschlag} 
      feiertagszuschlag={feiertagszuschlag} 
      nachtzuschlag={nachtzuschlag} 
      feinplanzuschlag={feinplanzuschlag} 
      pause={pause}
      />
 
    </>
  );
}

export function Title(){
    return <h1 
    className='ueberschrift'>
    Lohnrechner</h1>
}





const root = createRoot(document.getElementById('app'));

root.render(
  
    <BrowserRouter>
    <Title />
    
    <Routes>
      
      <Route path="/" element={<LohnrechnerPage />} />
      <Route path="/einstellungen" element={<EinstellungenPage />} />
    </Routes>
    <NavigationsBar />
  </BrowserRouter>
)