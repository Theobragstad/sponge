import React, { useState, useEffect,useRef } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { signin } from "./auth";
import { signout } from "./signout";

import sponge from "./img/sponge4.png";

import g from "./img/g.png";

import { Tooltip as ReactTooltip } from "react-tooltip";


function Home() {
  





  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const auth = () => {
    signin().then((token) => {
      updateUser(token);
    });
  };

  const signoutButton = () => {
    if (user) {
      signout().then(() => {
        updateUser(null);
      });
    }
  };

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Function to create a new circle element
  function createCircle() {
    const circle = document.createElement('div');
    circle.className = 'circle ' + (Math.random() < 0.5 ? 'yellow' : 'orange');
    circle.style.left = getRandom(0, window.innerWidth - 5) + 'px';
    circle.style.top = getRandom(0, window.innerHeight - 5) + 'px';
    document.body.appendChild(circle);

   
  }

  let circleCount = 0;

  // Function to add circles at a 100ms interval until 200 circles are added
  function addCircles() {
    if (circleCount < 50) {
      createCircle();
      circleCount++;
      setTimeout(addCircles, 100);
    }
  }

  // Start adding circles
  // addCircles();
  return (
    <div>
      <div class="outer-container">
  <div class="logoctr">
    <img src={sponge} className="logowithtext" alt="sponge logo" />
    <span className="logotext"><span className="orangebg">sponge</span><span className="yellowbg">notes</span></span>
  </div>

  {user ? (
    <div>
      {/* <p>Token: {user}</p> */}
      <button onClick={signoutButton}>sign out</button>
    </div>
  ) : (
    <div class="centered-container">
      <button className="gbtn" onClick={auth}><img src={g} alt='google logo' className="glogo" data-tooltip-content={'Log in with Google'} data-tooltip-id="misctooltip" /></button>
    </div>
  )}
</div>

      {/* <img src={sponge} className="logo" alt="sponge logo" id="logo" /> */}


        
     
      <ReactTooltip id="actiontooltip" className='tooltipdefault'/>
      <ReactTooltip id="misctooltip" className='tooltipdefault'/>


    </div>
  );
}

export default Home;
