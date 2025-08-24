


/* Importiert das Reactframework selbst (nötig um jsx zu nutzen und Komponenten zu  erstellen!) */
import React from "react";


/* ist für das Rendern von React-Komponenten zuständig */
      // Damit kann ich die App an einen bestimmten DOM-Knoten "anhängen" 

import ReactDOM from "react-dom/client";



/* Aus der React Query Library werden zwei Dinge importiert:
    1. QueryClient -> zentrale Instanz, die alle Queries (abfragen) und deren Cache verwaltet 
    2. QueryClientProvider -> React Provider, der den QueryClient für Komponenten verfügbar macht
    -> API - Requests effizient cachen, aktualisieren und verwalten
*/
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


/* ermöglicht es den React Query Cache zu persistieren (Daten über langen Zeitraum erhalten)
   Wenn die Seite neu geladen wird bleiben die gecachten Daten erhalten (z.B API-Antworten) -> offline zugriff möglich

*/
import { persistQueryClient } from "@tanstack/react-query-persist-client";


/* Erstellt einen Persister, der den Cache in einem asynchronen Storage speichert
   Typischerweiße wird das in Browsern als localStorage oder IndexedDB genutzt.
      -> funktioniert gut zusammen mit persistQueryClient
*/
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";


// Importiert meine Hauptkomponente App aus der localen Datei app.js
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Wie lange gelten die Daten als frisch?? 
        // Innerhalb der Zeit macht React Query keine neuen anfragen (requests)
      staleTime: 1000 * 60 * 60, 
      
      
      // Nach ablauf werden die Daten aus dem cache gelöscht!
      cacheTime: Infinity,
    },
  },
});

// Async-Persister (IndexedDB oder localStorage)
const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});


persistQueryClient({
  queryClient,
  persister,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);


/* 
      Persist  =   bestehen  
      Query     =   Abfrage
      Client    =   Nutzer
*/