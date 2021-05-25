import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { Watchlist } from "./components/Watchlist";
import { Watched } from "./components/Watched";
import { Movies } from "./components/Movies";
import "./lib/font-awesome/css/all.min.css";

import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/watchlist">
            <Watchlist />
          </Route>

          <Route path="/watched">
            <Watched />
          </Route>

          <Route path="/">
            <Movies />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
