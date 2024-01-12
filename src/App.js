import { useEffect, useRef } from "react";
import Boxes from "./components/Boxes/Boxes";
import "./index.css";

function App() {
  return (
    <>
      <h3>Family Wordle</h3>
      <div className="container">
        <Boxes />
      </div>
      <div>{/* <img src="./misc/wayne.png" alt="WAYYYYYNE"></img> */}</div>
    </>
  );
}

export default App;
