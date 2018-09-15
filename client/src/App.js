import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Notif from "./components/Notif/";

class App extends Component {
  state = {
    showit: false
  };

  render() {
    // let test = 'jkhsgksxvkx'

    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Saved" component={Saved} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
