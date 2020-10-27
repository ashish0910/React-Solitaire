import "./App.css";
import {
  OneSuite,
  TwoSuite,
  Home,
  Klondike,
  NotFound,
} from "./components/pages";
import * as ROUTES from "./utils/routes";

import { BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Home exact path={ROUTES.HOME}></Home>
          <Klondike path={ROUTES.KLONDIKE}></Klondike>
          <OneSuite path={ROUTES.ONESUITE}></OneSuite>
          <TwoSuite path={ROUTES.TWOSUITE}></TwoSuite>
          <NotFound path="/"></NotFound>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
