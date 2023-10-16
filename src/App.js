import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./Home";

function App() {
 
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
