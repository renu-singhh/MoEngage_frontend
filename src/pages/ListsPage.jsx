// src/pages/ListsPage.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ListPage.css";
import axios from "axios";
const ListsPage = () => {
  const [content, setContent] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getCodes();
  }, []);

  const getCodes = async () => {
    try {
      const savedList = location.state.data;
      const imagePromises = savedList.responseCodes.map(({ code }) =>
        axios
          .get(`https://http.dog/${code}.jpg`, { responseType: "blob" })
          .then((response) => {
            console.log(response);
            return {
              url: URL.createObjectURL(response.data),
              code,
            };
          })
      );
      const images = await Promise.all(imagePromises);
      setContent(images);
    } catch (error) {
      console.error("Error fetching all images:", error);
    }
  };

  const handleDelete = (listName) => {
    // const updatedLists = lists.filter((list) => list.name !== listName);
    // setContent(updatedLists);
    // localStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  const handleEdit = (list) => {
    // Implement edit logic here
    console.log("Editing list:", list);
  };

  return (
    <>
      {content ? (
        <div>
          <h1 className="listname">{location.state.data.name}</h1>
          <div className="img-container">
            {content.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`Response code ${content.query}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default ListsPage;
