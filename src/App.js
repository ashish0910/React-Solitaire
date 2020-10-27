import "./App.css";
import {
  OneSuite,
  FourSuite,
  Home,
  Klondike,
  NotFound,
} from "./components/pages";
import * as ROUTES from "./utils/routes";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import Card from "./components/Card";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Home exact path={ROUTES.HOME}></Home>
          <Klondike path={ROUTES.KLONDIKE}></Klondike>
          <OneSuite path={ROUTES.ONESUITE}></OneSuite>
          <FourSuite path={ROUTES.FOURSUITE}></FourSuite>
          <NotFound path="/"></NotFound>
        </Switch>
      </Router>
      <Card isDown={false} isSelected={false} rank="3" suit="heart"></Card>
    </div>
  );
}

export default App;
