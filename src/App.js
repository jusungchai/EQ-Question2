import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import Chart from './components/Chart'
import Table from './components/Table'
import MapVisual from './components/MapVisual'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/chart" component={Chart} />
        <Route path="/table" component={Table} />
        <Route path="/map" component={MapVisual} />
        <Route>
          404 Error
        </Route>
      </Switch>      
    </BrowserRouter>
  );
}

export default App;
