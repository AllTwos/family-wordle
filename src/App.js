import { useEffect, useRef } from "react";
import Boxes from "./components/Boxes/Boxes";
import "./index.css";

function App() {
  return (
    <div className="container">
      <h1>Family Wordle</h1>
      <Boxes />
    </div>
  );
}

export default App;
