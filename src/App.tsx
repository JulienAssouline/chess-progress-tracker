import React from "react";
import Rating from "./components/Rating"
import { DataProvider } from "./context";
import SideNav from "./components/SideNav"

import "./App.css";

const App: React.FC = () => {

  return (
    <DataProvider>
    <div className="App">
    <div className="dashboard-container">
    <SideNav />
      <Rating />
      </div>
    </div>
    </DataProvider>
  );
};

export default App;
