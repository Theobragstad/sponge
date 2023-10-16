import React, { useState, useEffect } from "react";
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

import sponge from "./img/sponge4.png"

function Home() {


  const [user, setUser] = useState(null); // State to track user sign-in status

  // Function to update user state when the user signs in
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const auth = () => {
    signin().then((token) => {
      // Update user state with user data
      updateUser(token);
    });
  };

  const signoutButton = () => {
    if(user) {
    signout().then(() => {
      // Update user state with user data
      updateUser(null);
    });}
  };


  const [itemText, setItemText] = useState("");

  const addItem = async () => {
    // Check if itemText is empty or whitespace
    if (!itemText || !itemText.trim()) {
      console.log("Item text is empty. Skipping document addition.");
      return; // Exit the function without adding a document
    }
  
    try {
      const docRef = await addDoc(collection(db, "items"), {
        item: itemText,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setItemText("");
  };
  

  const handleTextChange = (e) => {
    setItemText(e.target.value);
  };

  const [items, setItems] = useState([]);

  const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    setItems(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const [deleteState, setDeleteState] = useState(false);

  const deleteItem = async (id) => {
    const docRef = doc(db, "items", id);
    try {
      await deleteDoc(docRef);
      console.log("Entire Document has been deleted successfully.");
      setDeleteState((prevDeleteState) => !prevDeleteState);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getItems();
  }, [itemText, deleteState]);


  // Define state to track selected items
const [selectedItems, setSelectedItems] = useState([]);

// Function to toggle item selection
const handleItemSelection = (id) => {
  if (isSelected(id)) {
    // Item is already selected, so remove it from the selectedItems array
    setSelectedItems(selectedItems.filter((selectedId) => selectedId !== id));
  } else {
    // Item is not selected, so add it to the selectedItems array
    setSelectedItems([...selectedItems, id]);
  }
};

// Function to check if an item is selected
const isSelected = (id) => selectedItems.includes(id);

  return (
    <div>
      {user ? (
        // If the user is signed in, display the token
        <div>
          {/* <p>Token: {user}</p> */}
          <button onClick={signoutButton}>sign out</button>
          {/* You can also display a "Sign Out" button if needed */}
        </div>
      ) : (
        // If the user is not signed in, display the "Sign In" button
        <button onClick={auth}>sign in</button>
      )}
      <img src={sponge} className="logo" alt="sponge logo"/>
      <span className="logotext">sponge</span>
      <br />
      <input type="text" value={itemText} onChange={handleTextChange} />
      <button onClick={addItem}>+</button>
      <br />
      <br />
      <br />
      {items?.map(({ id, data }) => (
  <tr key={id} >
    <td>
      <input
        type="checkbox"
        className="checkbox-round"
        onChange={() => handleItemSelection(id)}
        checked={isSelected(id)}
      />
    </td>
    <td className="table-row">{data.item}</td>
  </tr>
))}

    </div>
  );
}

export default Home;
