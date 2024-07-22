// src/pages/ListsPage.js
import { useState, useEffect } from "react";

const ListsPage = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch lists from local storage or API
    const savedLists = JSON.parse(localStorage.getItem("lists")) || [];
    setLists(savedLists);
  }, []);

  const handleDelete = (listName) => {
    const updatedLists = lists.filter((list) => list.name !== listName);
    setLists(updatedLists);
    localStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  const handleEdit = (list) => {
    // Implement edit logic here
    console.log("Editing list:", list);
  };

  const handleView = (listname) => {
    window.location.search = `listname=${listname}`;
  };

  const queryParam = new URLSearchParams(window.location.search);
  const listname = queryParam.get("listname");

  if (listname) {
    return <ListData listname={listname} lists={lists} />;
  }

  return (
    <div>
      <h1>Saved Lists</h1>
      {lists.map((list) => (
        <div key={list.name}>
          <ListItem
            list={list}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleView={handleView}
          />
        </div>
      ))}
    </div>
  );
};

export default ListsPage;

const ListItem = ({ list, handleEdit, handleDelete, handleView }) => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      border: "1px solid #ccc",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid lightgray",
      backgroundColor: "white",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "50vw",
    },
  };

  return (
    <div style={styles.container}>
      <h2>{list.name}</h2>

      <div>
        <button onClick={() => handleView(list?.name)}>View List</button>
        <button onClick={() => handleEdit(list)}>Edit</button>
        <button onClick={() => handleDelete(list.name)}>Delete</button>
      </div>
    </div>
  );
};

const ListData = ({ listname, lists }) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      width: "80vw",
      border: "1px solid #ccc",
      height: "80vh",
      gap: "20px",
      borderRadius: "20px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid black", 
      width: "100%",
    },

    imageContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      overflowY: "scroll",
    },

    image: {  
      width: "200px",
      height: "200px",
      objectFit: "cover",
      margin: "5px",
    },  
  };

  return (
    <dialog open style={styles.container}>
      <div style={styles.header}>
        <h1>List Name: {listname}</h1>
        <button onClick={() => window.history.back()}>X</button>
      </div>

      {lists.map((list) => {
        if (list.name === listname) {
          return (
            <div key={list.name} style={styles.imageContainer}>
              {list.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`Response code ${list.query}`}
                  style={styles.image}  
                />
              ))}
            </div>
          );
        }
      })}
    </dialog>
  );
};
