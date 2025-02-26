import React from "react";
import { Routes, Route } from "react-router-dom";
import Slots from "./components/slots";
import BookSlot from "./components/book-slot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Slots />} />
      <Route path="/slot" element={<BookSlot />} />
    </Routes>
  );
}

export default App;
