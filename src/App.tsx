import React from "react";
import Rating from "./components/Rating"
import { DataProvider } from "./context";

import "./App.css";

const App: React.FC = () => {

  return (
    <DataProvider>
    <div className="App">
      <Rating />
    </div>
    </DataProvider>
  );
};

export default App;
