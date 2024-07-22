// src/pages/SearchPage.jsx
import PropTypes from "prop-types";
import { useState } from "react";
import "./SearchPage.css"; // Import the CSS file

const SearchPage = ({ images, handleSave, navigate }) => {
  const [filterText, setFilterText] = useState("");
  const [customList, setCustomList] = useState([]);
  // Function to filter images based on the filterText
  const filterImages = (filterText) => {
    if (filterText == "") {
      setCustomList([]);
      return;
    }
    const regex = new RegExp("^" + filterText.replace(/x/g, "\\d"), "i");
    let l = images.filter((img) => regex.test(img.code));
    if (l.length === 0) {
      setCustomList([]);
      return;
    }
    setCustomList(l);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    filterImages(e.target.value);
  };

  const handleSearch = () => {
    if (filterText.trim() === "") {
      alert("Please enter a response code or pattern.");
      return;
    }
    filterImages(filterText);
  };

  const handleSaveClick = (list) => {
    handleSave(list);
    navigate("/body"); // Navigate to home page after saving
  };

  return (
    <div>
      <h1 className="srch">Search Results</h1>
      <div className="search">
        <input
          type="text"
          className="search-box"
          onChange={handleFilterChange}
          placeholder="Filter response code"
        />
        <button onClick={handleSearch}>Search</button>
        <button
          className="save-button"
          onClick={() => {
            handleSaveClick(customList);
          }}
        >
          Save List
        </button>
      </div>
      {customList.length > 0 ? (
        <div className="image-container">
          {customList.map((img, index) => (
            <img key={index} src={img.url} alt={`Response code ${img.code}`} />
          ))}
        </div>
      ) : (
        customList.length == 0 && (
          <p className="no-images">No images found for this response code.</p>
        )
      )}
    </div>
  );
};

SearchPage.propTypes = {
  images: PropTypes.array.isRequired,
  handleSave: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default SearchPage;
