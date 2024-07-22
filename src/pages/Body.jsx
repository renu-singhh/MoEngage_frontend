import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchPage from './SearchPage';
import { useNavigate } from 'react-router-dom';
import './Body.css';

const Body = () => {
  const [searchText] = useState('');
  const [images, setImages] = useState([]);
  const [savedLists, setSavedLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all images on mount
    const fetchAllImages = async () => {
      try {
        const statusCodes = [
          100, 101, 102, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301,
          302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408,
          409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425,
          426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
        ];
        const imagePromises = statusCodes.map(code => 
          axios.get(`https://http.dog/${code}.jpg`, { responseType: 'blob' }).then(response => ({
            url: URL.createObjectURL(response.data),
            code
          }))
        );
        const images = await Promise.all(imagePromises); 
        setImages(images);
      } catch (error) {
        console.error('Error fetching all images:', error);
      }
    };

    fetchAllImages();

    // Fetch saved lists from local storage
    const lists = JSON.parse(localStorage.getItem('lists')) || [];
    setSavedLists(lists);
  }, []);

  const handleSave = () => {
    const listName = prompt('Enter list name:');
    if (listName) {
      const newList = { name: listName, query: searchText, images };
      const updatedLists = [...savedLists, newList];
      setSavedLists(updatedLists);
      localStorage.setItem('lists', JSON.stringify(updatedLists));
    }
  };

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clearing authentication tokens and navigating to login page
    navigate('/');
  };

  return (
    <div className="container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1>HTTP Status Dogs</h1>
      <h4>Dogs for every HyperText Transfer Protocol response status code.</h4>
      <SearchPage images={images} handleSave={handleSave} navigate={navigate} />
    </div>
  );
};

export default Body;