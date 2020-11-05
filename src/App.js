import "./App.css";
import {
  OneSuite,
  FourSuite,
  Home,
  Klondike,
  NotFound,
} from "./components/pages";
import ScreenSizeWarn from "./components/ScreenSizeWarn";
import * as ROUTES from "./utils/routes";

import { BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <ScreenSizeWarn />
      <div className="app__gameplay">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Home exact path={ROUTES.HOME}></Home>
            <Klondike path={ROUTES.KLONDIKE}></Klondike>
            <OneSuite path={ROUTES.ONESUITE}></OneSuite>
            <FourSuite path={ROUTES.FOURSUITE}></FourSuite>
            <NotFound path="/"></NotFound>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
