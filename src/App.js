import { useEffect, useRef } from "react";
import Boxes from "./components/Boxes/Boxes";
import "./index.css";

function App() {
  return (
    <>
      <div className="container">
        <Boxes />
      </div>
      <div>
        {/* <img src="./misc/wayne.png" alt="WAYYYYYNE"></img> */}
        <h3>Family Wordle</h3>
      </div>
    </>
  );
}

export default App;
