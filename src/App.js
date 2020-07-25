import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TotalCount from "./Components/TotalCount/TotalCount.jsx";
import Heading from "./Components/Heading/Heading.jsx";
import StateWise from "./Components/StateWise/StateWise.jsx";
function App() {
  return (
    <div className="App">
      <Heading />
      <TotalCount />
      <StateWise />
    </div>
  );
}

export default App;
