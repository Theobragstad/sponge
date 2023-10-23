import { Routes, Route, Navigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect } from "react";

import "./App.css";

import Home from "./Home";
import DisableZoom from './DisableZoom';
import Darkmode from 'darkmode-js';

const options = {
  time: '0.5s',
  mixColor: '#fff',
  backgroundColor: '#fff',
  buttonColorDark: '#100f2c',
  buttonColorLight: '#fff',
  autoMatchOsTheme: true,
};

// const darkmode = new Darkmode(options);
// darkmode.showWidget();
const darkmode = new Darkmode(options);

function App() {





  const [isDarkMode, setIsDarkMode] = useState(darkmode.isActivated());

  useEffect(() => {
    // Listen for changes to the system theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e) => {
      if (e.matches) {
        // Check if dark mode is already activated, and toggle if not
        if (!darkmode.isActivated()) {
          darkmode.toggle();
        }
      } else {
        // Check if dark mode is already activated, and toggle if it is
        if (darkmode.isActivated()) {
          darkmode.toggle();
        }
      }

      // Update the isDarkMode state based on the system theme
      setIsDarkMode(e.matches);
    };

    // Add the listener
    mediaQuery.addEventListener("change",handleThemeChange);

    // Initial theme detection
    handleThemeChange(mediaQuery);

    // Clean up the listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change",handleThemeChange);
    };
  }, []);
  

  return (
    <div className="App"><DisableZoom />
     
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
  );
}

export default App;
