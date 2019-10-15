import React from "react";
import Rating from "./components/Rating"
import { DataProvider } from "./context";

import "./App.css";

const App: React.FC = () => {

  return (
    <DataProvider>
    <div className="App">
      <h1> Chess app </h1>
      <Rating />
    </div>
    </DataProvider>
  );
};

export default App;
