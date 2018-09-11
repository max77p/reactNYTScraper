import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Saved from "./pages/Saved";

const App = () => (
  <Router>
    <div className="container" >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Saved" component={Saved} />
      </Switch>
    </div>
  </Router>
);

export default App;
