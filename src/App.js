import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Watchlist } from './components/Watchlist';
import { Watched } from './components/Watched';
import { Add } from './components/Add';
import './lib/font-awesome/css/all.min.css';

import { GlobalContext, GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />

        <Switch>

          <Route exact path="/">
            <Watchlist />
          </Route>

          <Route path="/watched">
            <Watched />
          </Route>

          <Route path="/add">
            <Add />
          </Route>
          
        </Switch>

      </Router>
    </GlobalProvider>
  );
}

export default App;
