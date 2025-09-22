
// useQuery ist ein React Hock der erlaubt daten asyncron zu laden, zu cachen und den Ladezustand zu verwalten.
import { useQuery } from "@tanstack/react-query";

// Fetch-Funktion
/* fetch Todos Schickt HTTP anfrage and die URL 
*  await fetch(...) holt die Daten vom Server
*  if (!res.ok) prüft ob die Abfrage einen Fehler hat -> fals ja wird er ausgegeben
*  wenn alles Funktioniert wird res.json() ausgegeben. */




async function fetchTodos() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!res.ok) throw new Error("Fehler beim Laden");
    return res.json();
}

export default function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  })

  /* Daten werden erst geladen wenn Daten vorhanden sind */
  if (isLoading) return <p>Lade Daten...</p>;
  console.log(data);
  if (error) return <p>{error.message}</p>;

  return (
    <ul>
      {data.slice(0, 10).map((todo, index) => (
        
        <li key={todo.id}>{index +1}.<br/>{todo.title} - {todo.completed ? "true" : "false"} </li>
      ))}
    </ul>
  );
}