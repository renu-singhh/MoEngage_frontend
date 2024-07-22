import { useState, useEffect } from "react";
import axios from "axios";
import SearchPage from "./SearchPage";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Body.css";

const Body = () => {
  // const [searchText] = useState("");
  const [images, setImages] = useState([]);
  const [email, setEmail] = useState("");
  // const [savedLists, setSavedLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    const fetchAllImages = async () => {
      try {
        const statusCodes = [
          100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300,
          301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406,
          407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422,
          423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505,
          506, 507, 508, 510, 511,
        ];
        const imagePromises = statusCodes.map((code) =>
          axios
            .get(`https://http.dog/${code}.jpg`, { responseType: "blob" })
            .then((response) => {
              return {
                url: URL.createObjectURL(response.data),
                code,
              };
            })
        );
        const images = await Promise.all(imagePromises);
        setImages(images);
      } catch (error) {
        console.error("Error fetching all images:", error);
      }
    };
    fetchProfile();
    fetchAllImages();
  }, []);

  const handleSave = async (list) => {
    const listName = prompt("Enter list name:");
    if (listName) {
      // console.log(listName, list, email);
      try {
        const response = await axios.post(
          "http://localhost:5500/lists/addlist",
          {
            listName,
            list,
            email,
          }
        );
        alert("List Created Successfully");
        // console.log("List created successfully:", response.data);
      } catch (error) {
        console.error("Error creating list:", error);
      }
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      const response = await axios.get("http://localhost:5500/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmail(response.data.email);
      // console.log("User email:", response.data.email);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const FetchList = async () => {
    navigate("/listsdata");
  };

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clearing authentication tokens and navigating to login page
    navigate("/");
  };

  // const handleListD = () => {
  //   navigate('/listsdata');
  // }

  return (
    <div className="container">
      <div className="btn-group">
        <button className="list-button" onClick={FetchList}>
          List
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <SearchPage images={images} handleSave={handleSave} navigate={navigate} />
    </div>
  );
};

export default Body;
