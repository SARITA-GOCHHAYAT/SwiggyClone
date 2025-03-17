import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import ResturantMenu from "./components/ResturantMenu";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Body />}></Route>
        <Route path="/restaurantMenu/:id" element={<ResturantMenu/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
