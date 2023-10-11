import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Neworder from "./Components/Neworder";
import Updateorder from "./Components/Updateorder";
import Order from "./Components/Order";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/neworder" element={<Neworder />} />
        <Route path="/updateorder" element={<Updateorder />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;