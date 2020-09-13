import React from "react";
import "./App.css";
import AddStory from "./pages/AddStory";
import ScrumMaster from "./pages/ScrumMaster";

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
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
