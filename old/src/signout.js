import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const signout = () => {
  return signOut(auth); 
};
