import React from "react";
import Rating from "./components/Rating"

import "./App.css";

const App: React.FC = () => {

  return (
    <div className="App">
      <h1> Chess app </h1>
      <Rating />
    </div>
  );
};

export default App;
