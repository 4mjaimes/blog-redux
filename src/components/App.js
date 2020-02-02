import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Users from "./Users";

const Tareas = () => <p>Tareas</p>;

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className='margin'>
      <Route exact path="/" component={Users} />
      <Route exact path="/tareas" component={Tareas} />
    </div>
  </BrowserRouter>
);

export default App;
