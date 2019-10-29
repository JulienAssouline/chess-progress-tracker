import React from "react";
import Rating from "./components/Rating/RatingConatiner";
import Rival from "./components/Rival/RivalContainer";
import Monthly from "./components/Monthly/MonthlyTrends"
import Summary from "./components/Summary/SummaryContainer"
import { DataProvider } from "./context";
import SideNav from "./components/Nav/SideNav";
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
          <Route path="/monthly" exact component = {Monthly} />
          <Route path="/summary" exact component = {Summary} />
        </div>
        </Router>
      </div>
    </DataProvider>
  );
};

export default App;
