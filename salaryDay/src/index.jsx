
import { createRoot } from 'react-dom/client';

import { Rechner } from './logik';
import { StdLohn } from './stdLohn';

import { useState } from "react";

// App-Container erzeugen, falls nicht vorhanden
if (!document.getElementById("app")) {
  const appDiv = document.createElement("div");
  appDiv.id = "app";
  document.body.appendChild(appDiv);
}

export function App() {
  const [stdLohn, setStdLohn] = useState(localStorage.getItem("stdLohn") || "");

  return (
    <>
      <StdLohn stdLohn={stdLohn} setStdLohn={setStdLohn} />
      <Rechner stdLohn={stdLohn} />
    </>
  );
}

function Title(){
    return <h1 
    className='ueberschrift'>
    SALARY DAY</h1>
}



const root = createRoot(document.getElementById('app'));

root.render(
    <>
        <Title />
        <App />
    </>
)