import React from "react";
import "./App.css";
import AddStory from "./pages/AddStory";
import Developer from "./pages/Developer";
import ScrumMaster from "./pages/ScrumMaster";
import Success from "./pages/Success";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={AddStory} />
            <Route path="/addstory">
              <AddStory />
            </Route>
            <Route path="/scrummaster">
              <ScrumMaster />
            </Route>
            <Route path="/developer">
              <Developer />
            </Route>
            <Route path="/success">
              <Success />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
