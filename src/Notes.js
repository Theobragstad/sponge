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
import dragicon from "./img/drag.png";

import g from "./img/g.png";

import ContentResizer from "./ContentResizer";
import { Tooltip as ReactTooltip } from "react-tooltip";

import Menu from "./Menu";

function Home() {
  const inputRef = useRef(null);
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setItemText(""); // Clear the input
      }
    };
  
    document.addEventListener("click", handleDocumentClick);
  
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  
  useEffect(() => {
    // dragElement(document.getElementById("logo"));
    dragElement(document.getElementById("list"));



  }, []);



  

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

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

  const [itemText, setItemText] = useState("");

//   const addItem = async () => {
//     if (!itemText || !itemText.trim()) {
//       console.log("Item text is empty. Skipping document addition.");
//     }
//     const newlineCount = (itemText.match(/\n/g) || []).length;
// console.log(newlineCount)
//     try {
//       const docRef = await addDoc(collection(db, "items"), {
//         item: itemText,
//       });
//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//     setItemText("");
//   };
const addItem = async () => {
  if (!itemText || !itemText.trim()) {
    console.log("Item text is empty. Skipping document addition.");
  } else {
    // Split itemText by newlines
    const lines = itemText.split('\n');
    for (const line of lines) {
      if (line.trim() !== '') {
        try {
          const docRef = await addDoc(collection(db, "items"), {
            item: line,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  }
  setItemText("");
};
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter"&& !e.shiftKey) {
      e.preventDefault();
      addItem();
    }
  };
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     addItem();
  //   }
  // };
  

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
      getItems();
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getItems();
  }, [itemText, deleteState]);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemSelection = (id) => {
    if (isSelected(id)) {
      setSelectedItems(selectedItems.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const isSelected = (id) => selectedItems.includes(id);

  const selectAllItems = () => {
    const allItemIds = items.map((item) => item.id);
    setSelectedItems(allItemIds);
  };

  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  const allItemsSelected = items.length === selectedItems.length;

  const deleteSelectedItems = async () => {
    for (const id of selectedItems) {
      await deleteItem(id);
    }
    setSelectedItems([]);
  };

  const hasSelectedItems = selectedItems.length > 0;




  const [overviewMode, setOverviewMode] = useState(false);


  const notecolors = ['yellow', 'orange', 'red', 'pink','blue', 'green','purple','black','gray']
 
  const notes = [
    { id:0,name: 'note 1', color: notecolors[0] },
    { id:1, name: 'note 2', color: notecolors[1] },
    { id:2, name: 'note 3', color: notecolors[8] },
  ];
  return (
    <div>
      <div id='menu'><Menu notes={notes} /></div>
      
      {user ? (
        <div>
          {/* <p>Token: {user}</p> */}
          <button onClick={signoutButton}>sign out</button>
        </div>
      ) : (
        <button className="gbtn" onClick={auth}><img src={g} alt='google logo' className="glogo" data-tooltip-content={'Log in with Google'} data-tooltip-id="misctooltip"/></button>
      )}
      {/* <img src={sponge} className="logo" alt="sponge logo" id="logo" /> */}


          <div className="logoctr">
          <img src={sponge} className="logowithtext" alt="sponge logo"  /> 
      <span className="logotext"><span className="orangebg">sponge</span><span className="yellowbg">notes</span></span>
      </div>
      <br />
      { items.length > 0&&
      <button onClick={()=>setOverviewMode(!overviewMode)}  className="btnsimple" data-tooltip-id="misctooltip"
    data-tooltip-content={`toggle view`}>{overviewMode ? <div className="orangecircle">&nbsp;</div>:<div className="yellowcircle">&nbsp;</div>}</button>}

      { !allItemsSelected&&
<button onClick={selectAllItems}  className=" actionbtn checkbox-round hoverselect" data-tooltip-id="actiontooltip"
    data-tooltip-content={`select all`}></button>}
{ hasSelectedItems&& 
            <button onClick={deselectAllItems}  className="actionbtn checkbox-round hoverdeselect"  data-tooltip-id="actiontooltip"
            data-tooltip-content={`deselect all`}></button>}
            {hasSelectedItems && (
              <button onClick={deleteSelectedItems} className="actionbtn checkbox-round hoverdelete"  data-tooltip-id="actiontooltip"
              data-tooltip-content={`delete selected`}></button>
            )}
      <br />
      <br />
      <br />
      {/* <input type="checkbox" className="checkbox-round" checked={false} readOnly/> */}
      <textarea
        // type="text"
        value={itemText}
        className="custom-input "
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        maxLength={500}
        ref={inputRef}
        style={{
          width:'150px',
          minHeight:'15px',
          minWidth:'100px',
          fontFamily: 'Arial, sans-serif',
          maxWidth: "300px", // Set your desired maximum width in CSS units
          maxHeight: "200px", // Set your desired maximum height in CSS units
        }}
      />
      <div id="list" style={{ position: "absolute" }}>
        <ContentResizer>
          <div>
            {/* <input type="text" value={itemText} onChange={handleTextChange}  onKeyDown={handleKeyDown}/> */}

            
          </div>
          <div className="list">
            {overviewMode ? (<div>
              

              {/* {items?.map(({ id, data }, index) => (
                
      <span key={id} className="table-row list-item itemblock" onClick={() => deleteItem(id)} >
        {data.item}
      </span>
    ))} */}
  <div className="overview-container">
   
      {items?.map(({ id, data }, index) => (
        <div key={id} className="overview-item itemblock list-item table-row">
          {data.item}
        </div>
      ))}
    </div>
            </div>): (
          items?.map(({ id, data }) => (
            <tr key={id}>
              <td><span className="dragicon">-</span></td>
              <td>
              
                <input
                  type="checkbox"
                  className="checkbox-round"
                  onChange={() => handleItemSelection(id)}
                  checked={isSelected(id)}
                />
              </td>
              <td className={isSelected(id)?"table-row list-item gray":"table-row list-item"} onClick={() => deleteItem(id)}>
                {data.item}
              </td>
            </tr>
          )))}
          </div>
        </ContentResizer>
      </div>
      <ReactTooltip id="actiontooltip" className='tooltipdefault'/>
      <ReactTooltip id="misctooltip" className='tooltipdefault'/>


    </div>
  );
}

export default Home;
