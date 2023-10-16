// signout.js
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const signout = () => {
  return signOut(auth); // Return the promise from signOut
};
