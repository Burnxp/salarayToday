
// useQuery ist ein React Hock der erlaubt daten asyncron zu laden, zu cachen und den Ladezustand zu verwalten.
import { useQuery } from "@tanstack/react-query";

// Fetch-Funktion
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
  if (isLoading) return <p>Lade Daten...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ul>
      {data.slice(10, 20).map((todo) => (
        <li>{todo.title} - {todo.completed ? "true" : "false"} </li>
      ))}
    </ul>
  );
}