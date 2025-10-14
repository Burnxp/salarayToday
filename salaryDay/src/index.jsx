
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Rechner } from './logik';
import { StdLohn } from './stdLohn';
import {NavigationsBar} from './navigation';
import { useState } from "react";

// App-Container erzeugen, falls nicht vorhanden
if (!document.getElementById("app")) {
  const appDiv = document.createElement("div");
  appDiv.id = "app";
  document.body.appendChild(appDiv);
}


function LohnrechnerPage() {
  const [stdLohn, setStdLohn] = useState(localStorage.getItem("stdLohn") || "");
  return (
    <>
      <StdLohn stdLohn={stdLohn} setStdLohn={setStdLohn} />
      <Rechner stdLohn={stdLohn} />
    </>
  );
}

export function Title(){
    return <h1 
    className='ueberschrift'>
    SALARY DAY</h1>
}

function EinstellungenPage() {
  return <h2>Einstellungen</h2>; // Hier später dein Einstellungen-Formular
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