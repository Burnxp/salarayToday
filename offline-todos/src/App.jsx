import Todos from "./Todos"; // Standart import ohne geschweifte Klammern
import {Footer} from "./Footer"; // namentlicher Import mit geschweiften klammern

/* import Todos, { Test, Test2 } from "./test"; // Kombination ist auch möglich
 */



export default function App() {
  return (
    <div style={{padding: "2rem"}}>
      <h1>Offline Todos Demo</h1>
      <Todos />
      <Footer />
      

    </div>
  );
}

