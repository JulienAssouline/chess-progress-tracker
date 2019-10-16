import React from "react";
import Rating from "./components/Rating";
import Rival from "./components/Rival";
import { DataProvider } from "./context";
import SideNav from "./components/SideNav";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

const App: React.FC = () => {
  return (
    <DataProvider>
      <div className="App">
      <Router>
        <div className="dashboard-container">
          <SideNav />
          <Route path="/" exact component = {Rating} />
          <Route path="/rival" exact component = {Rival} />
        </div>
        </Router>
      </div>
    </DataProvider>
  );
};

export default App;
