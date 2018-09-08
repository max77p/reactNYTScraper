import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

const App = () => (
  <Router>
    <div className="container">
      <Switch>
        <Route exact path="/home" component={Home} />
      </Switch>
    </div>
  </Router>
);

export default App;
