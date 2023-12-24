import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import "./App.css";
import Home from "./Home";
import Notes from "./Notes";
import DisableZoom from "./DisableZoom";

function App() {
  return (
    <div className="App">
      <DisableZoom />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/notes" element={<Notes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
