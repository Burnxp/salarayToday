import { useState, useEffect } from "react";

export function useZuschlaege() {
  // Initialisiere Zustände mit Werten aus dem lokalen Speicher oder Standardwerten
  const [sonntagszuschlag, setSonntagszuschlag] = useState(() => localStorage.getItem("Sonntagszuschlag") || "100");
  const [feiertagszuschlag, setFeiertagszuschlag] = useState(() => localStorage.getItem("Feiertagszuschlag") || "100");
  const [nachtzuschlag, setNachtzuschlag] = useState(() => localStorage.getItem("Nachtzuschlag") || "25");
  const [feinplanzuschlag, setFeinplanzuschlag] = useState(() => localStorage.getItem("Feinplanzuschlag") || "0");
  const [stdLohn, setStdLohn] = useState(() => localStorage.getItem("stdLohn") || "10");
  
   // 🔥 neue Zustände für Nachtzeiten
  const [nachtzeitenStart, setNachtzeitenStart] = useState(localStorage.getItem("nachtzeitenStart") || "21:00");
  const [nachtzeitenEnd, setNachtzeitenEnd] = useState(localStorage.getItem("nachtzeitenEnd") || "05:00");

  // Synchronisiere Änderungen mit dem lokalen Speicher
  useEffect(() => {
    localStorage.setItem("Sonntagszuschlag", sonntagszuschlag);
  }, [sonntagszuschlag]);

  useEffect(() => {
    localStorage.setItem("Feiertagszuschlag", feiertagszuschlag);
  }, [feiertagszuschlag]);

  useEffect(() => {
    localStorage.setItem("Nachtzuschlag", nachtzuschlag);
  }, [nachtzuschlag]);

  useEffect(() => {
    localStorage.setItem("stdLohn", stdLohn);
  }, [stdLohn]);

  useEffect(() => {
    localStorage.setItem("Feinplanzuschlag", feinplanzuschlag);
  }, [feinplanzuschlag]);
    useEffect(() => { localStorage.setItem("nachtzeitenStart", nachtzeitenStart); }, [nachtzeitenStart]);
    useEffect(() => { localStorage.setItem("nachtzeitenEnd", nachtzeitenEnd); }, [nachtzeitenEnd]);

  return {
    sonntagszuschlag,
    setSonntagszuschlag,
    feiertagszuschlag,
    setFeiertagszuschlag,
    nachtzuschlag,
    setNachtzuschlag,
    feinplanzuschlag,
    setFeinplanzuschlag,
    nachtzeitenStart,
    nachtzeitenEnd,
    setNachtzeitenStart,
    setNachtzeitenEnd,
    stdLohn,
    setStdLohn
  };
}
