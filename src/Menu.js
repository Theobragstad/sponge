import React, { useState, useEffect } from "react";

import orangeicon from "./img/orangeicon.png";
import blueicon from "./img/blueicon.png";
import pinkicon from "./img/pinkicon.png";
import redicon from "./img/redicon.png";
import greenicon from "./img/greenicon.png";
import purpleicon from "./img/purpleicon.png";
import blackicon from "./img/blackicon.png";
import grayicon from "./img/grayicon.png";
import yellowicon from "./img/yellowicon.png";
import { Tooltip as ReactTooltip } from "react-tooltip";


const Menu = ({ notes }) => {
  
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
      
  const icons = {
    yellow: yellowicon,
    orange: orangeicon,
    red: redicon,
    pink: pinkicon,
    blue: blueicon,
    green: greenicon,
    purple: purpleicon,
    black: blackicon,
    gray: grayicon,
  };

  const noteElements = notes.map((note) => (
    <span
      key={note.id}
      data-tooltip-content={note.name}
      data-tooltip-id={"notetooltip"}
    >
      <img
        src={icons[note.color]}
        alt={`note ${note.id}`}
        className='noteicon'
      />
    </span>
  ));

  

  return (
    <div>
    <div className="notebar">{noteElements}</div>
    <ReactTooltip id="notetooltip" className='tooltipdefault'/>
  </div>
  );
};

export default Menu;
