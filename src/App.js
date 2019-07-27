// App.js
import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import NutritionCalculator from './NutritionCalculator';
import Review from './Review';

function App() {
  return (
    <HashRouter basename="/">
        <div>
          <Route exact path="/" component={NutritionCalculator} />
          <Route path="/calculator" component={Review} />
        </div>
      </HashRouter>
  );
}

export default App;
