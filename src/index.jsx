
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Rechner } from './logik';
import { StdLohn } from './stdLohn';
import  { Zuschlag }  from './zuschlagsVariablen';
import {NavigationsBar} from './navigation';
import { useState } from "react";

// App-Container erzeugen, falls nicht vorhanden
if (!document.getElementById("app")) {
  const appDiv = document.createElement("div");
  appDiv.id = "app";
  document.body.appendChild(appDiv);
}

function EinstellungenPage() {
  const [sonntagszuschlag, setSonntagszuschlag] = useState(localStorage.getItem("Sonntagszuschlag") || "");
  const [feiertagszuschlag, setFeiertagszuschlag] = useState(localStorage.getItem("Feiertagszuschlag") || "");
  const [nachtzuschlag, setNachtzuschlag] = useState(localStorage.getItem("Nachtzuschlag") || "");
  const [feinplanzuschlag, setFeinplanzuschlag] = useState(localStorage.getItem("Feinplanzuschlag") || "");

  return (
    <>
      <h2>Einstellungen</h2>

      <Zuschlag
        name="Sonntagszuschlag"
        wert={sonntagszuschlag}
        setWert={setSonntagszuschlag}
      />

      <Zuschlag
        name="Feiertagszuschlag"
        wert={feiertagszuschlag}
        setWert={setFeiertagszuschlag}
      />

      <Zuschlag
        name="Nachtzuschlag"
        wert={nachtzuschlag}
        setWert={setNachtzuschlag}
      />
      <Zuschlag
        name="Feinplanzuschlag"
        wert={feinplanzuschlag}
        setWert={setFeinplanzuschlag}
      />
    </>
  );
}

function LohnrechnerPage() {
  const [stdLohn, setStdLohn] = useState(localStorage.getItem("stdLohn") || "");
    const [sonntagszuschlag] = useState(localStorage.getItem("Sonntagszuschlag") || "");
  
  return (
    <>
      <StdLohn stdLohn={stdLohn} setStdLohn={setStdLohn} />
      <Rechner stdLohn={stdLohn} sonntagszuschlag={sonntagszuschlag}/>
 
    </>
  );
}

export function Title(){
    return <h1 
    className='ueberschrift'>
    SALARY DAY</h1>
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