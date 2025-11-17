
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Rechner } from './logik';
import { EinstellungenPage } from './pages/einstellungen';
import  FeedbackForm  from './feedbackForm';
import { useZuschlaege } from "./hooks/useZuschlaege";
import { ImpressumDatens } from './templates/impressumDatens';
import {NavigationsBar} from './templates/navigation';
import { useState } from "react";

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

export function Title() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <h1 className="ueberschrift">Lohnrechner</h1>

      <button className='feedbackButton' onClick={() => setShowForm(true)}>Feedback geben</button>

      {showForm && <FeedbackForm onClose={() => setShowForm(false)} />}
    </>
  );
}





const root = createRoot(document.getElementById('app'));

root.render(
  <>
  <BrowserRouter>
  <div className="appView">
        
    <Title />
    
    <Routes>
      
      <Route path="/" element={<LohnrechnerPage />} />
      <Route path="/einstellungen" element={<><EinstellungenPage /> </>} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />      
    </Routes>
    
    <NavigationsBar />
    
  
  </div>
< ImpressumDatens />
</BrowserRouter>
</>
);

