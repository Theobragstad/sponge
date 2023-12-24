import React, { useState, useEffect, useRef } from "react";
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

  return (
    <div>
      <div class="outer-container">
        <div class="logoctr">
          <img src={sponge} className="logowithtext" alt="sponge logo" />
          <span className="logotext">
            <span className="orangebg">sponge</span>
            <span className="yellowbg">notes</span>
          </span>
        </div>

        {user ? (
          <div>
            <button onClick={signoutButton}>sign out</button>
          </div>
        ) : (
          <div class="centered-container">
            <button className="gbtn" onClick={auth}>
              <img
                src={g}
                alt="google logo"
                className="glogo"
                data-tooltip-content={""}
                data-tooltip-id="misctooltip"
              />
            </button>
          </div>
        )}
      </div>
      <ReactTooltip id="actiontooltip" className="tooltipdefault" />
      <ReactTooltip id="misctooltip" className="tooltipdefault" />
    </div>
  );
}

export default Home;
