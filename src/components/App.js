import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Users from "./Users";

const Tareas = () => (
  <p>Tareas</p>
)

const App = () => (
  <BrowserRouter>
    <Menu />
    <Route exact path="/" component={Users} />
    <Route exact path="/tareas" component={Tareas} />
  </BrowserRouter>
);

export default App;
