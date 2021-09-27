import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryProvider } from "./context/QueryContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Watchlist from "./components/Watchlist/Watchlist";

function App() {
  return (
    <WatchlistProvider>
      <QueryProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/watchlist" component={Watchlist} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </QueryProvider>
    </WatchlistProvider>
  );
}

export default App;
