import { RocketLaunch } from "phosphor-react"
import { List } from "./assets/list";
import {  } from "react";
import "./App.css";


function App() {
  return (
    <>
        <div className="App">

          <div className="Logo">
            <strong>To-do</strong>
            <RocketLaunch/>
          </div>

          <List/>
        </div>
        
    </>
  );
}

export default App;
