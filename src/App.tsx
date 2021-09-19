import * as React from 'react';
import "./configureMobx";
import { AppStateContextProvider, AppState } from './AppState';
import Header from './Header';
import Body from './Body';

import './App.scss';

const appState = new AppState();

const App = () => {
  return (
    <AppStateContextProvider value={appState}>
      <div className="App">
        <Header />
        <Body />
      </div>
    </AppStateContextProvider>
  );
}


export default App;
