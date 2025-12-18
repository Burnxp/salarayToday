
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Rechner } from './logik';
import { EinstellungenPage } from './pages/einstellungen';


import { useZuschlaege } from "./hooks/useZuschlaege";


/* templates */
/* import { Startapp } from './templates/startApp.jsx'; */
import { Header } from './templates/header';
import {NavigationsBar} from './templates/navigation';

import { Hilfe } from './pages/hilfe';



import { useState, useEffect } from "react";


import Impressum from './pages/impressum';
import Datenschutz from './pages/datenschutz';

// App-Container erzeugen, falls nicht vorhanden
if (!document.getElementById("app")) {
  const appDiv = document.createElement("div");
  appDiv.id = "app";
  document.body.appendChild(appDiv);
}



function LohnrechnerPage() {
  
  const {sonntagszuschlag,
    feiertagszuschlag,
    nachtzuschlag,
    feinplanzuschlag,
    nachtzeitenStart,
    nachtzeitenEnd,
    stdLohn
  } = useZuschlaege();
    const [pause] = useState(localStorage.getItem("Pause") || "");

  
  return (
    
      
       <Rechner 
      stdLohn={stdLohn} 
      sonntagszuschlag={sonntagszuschlag} 
      feiertagszuschlag={feiertagszuschlag} 
      nachtzuschlag={nachtzuschlag} 
      feinplanzuschlag={feinplanzuschlag} 
      pause={pause}
      />
    
      
     
 
   
  );
}

 


const root = createRoot(document.getElementById('app'));

root.render(
  <div className="app-screen">
  <BrowserRouter>
  
        
    <Header />
    
    <Routes>
      
      <Route path="/" element={<LohnrechnerPage />} />
      <Route path="/einstellungen" element={<EinstellungenPage />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />    
          <Route path="/hilfe" element={<Hilfe />}   />
    </Routes>
    
    <NavigationsBar />
    
  
  

</BrowserRouter>
</div>
);

// Wird NICHT zurückgesetzt, solange die Seite nicht neu geladen wird
/* let splashAlreadyShown = false;

function App() {
  const [showStartApp, setShowStartApp] = useState(!splashAlreadyShown);

  useEffect(() => {
    if (!splashAlreadyShown) {
      setTimeout(() => {
        splashAlreadyShown = true;   // Merken für diese Session
        setShowStartApp(false);      // Splashscreen ausblenden
      }, 2000);
    }
  }, []);

  if (showStartApp) {
    return <Startapp />;    // Nur einmal pro Session
  }

  return (
    
    <BrowserRouter>
    <Header />
      <Routes>
        
        <Route path="/lohnrechner" element={<LohnrechnerPage />} />
        <Route path="/einstellungen" element={<EinstellungenPage />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/hilfe" element={<Hilfe />} />
      </Routes>
      <NavigationsBar />
    </BrowserRouter>
    
  );
}

root.render(<App />); */


