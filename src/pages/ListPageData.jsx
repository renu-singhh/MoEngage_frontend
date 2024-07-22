import { useLocation, useNavigate } from "react-router-dom";
import "./ListPageData.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ListsPage = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const VITE_API = import.meta.env.VITE_API;
  const [email, setEmail] = useState("");
  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (email) {
      fetchcustomlist();
    }
  }, [email]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${VITE_API}profile`, {
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

  const fetchcustomlist = async () => {
    try {
      const response = await axios.get(`${VITE_API}lists/getlists`, {
        params: { email },
      });
      setList(response.data);
    } catch (err) {
      console.log("Couldn't Fetch ", err);
    }
  };

  const deleteListById = async (name, userEmail) => {
    try {
      const response = await axios.delete(
        `${VITE_API}lists/delete/${encodeURIComponent(
          userEmail
        )}/${encodeURIComponent(name)}`
      );
      fetchcustomlist();
      // console.log("Document deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="lists-container">
      <h1>Saved Lists</h1>
      {!list || list.length === 0 ? (
        <p>No saved lists Found.</p>
      ) : (
        <div>
          {list.map((list, index) => (
            <div className="inner-container">
              <div className="listitem">
                <button className="list-btn">{list.name}</button>
                <div>
                  <button
                    onClick={() => {
                      navigate("/listscontent", { state: { data: list } });
                    }}
                    className="view-btn"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteListById(list.name, list.userEmail)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListsPage;
