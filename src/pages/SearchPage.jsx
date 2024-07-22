// src/pages/SearchPage.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import './SearchPage.css'; // Import the CSS file

const SearchPage = ({ images, handleSave, navigate }) => {
  const [filterText, setFilterText] = useState('');
  
  // Function to filter images based on the filterText
  const filterImages = () => {
    const regex = new RegExp('^' + filterText.replace(/x/g, '\\d'), 'i');
    return images.filter(img => regex.test(img.code));
  };

  const filteredImages = filterImages();

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleSearch = () => {
    if (filterText.trim() === '') {
      alert('Please enter a response code or pattern.');
      return;
    }

    const filtered = filterImages();
    if (filtered.length === 0) {
      alert('No images found for this response code.');
    }
  };

  const handleSaveClick = () => {
    handleSave();
    navigate('/lists'); // Navigate to home page after saving
  };

  return (
    <div>
      <h1>Search Results</h1>
      <div className="search">
        <input
          type="text"
          className="search-box"
          value={filterText}
          onChange={handleFilterChange}
          placeholder="Filter response code"
        />
        <button onClick={handleSearch}>Search</button>
        <button className="save-button" onClick={handleSaveClick}>Save List</button>
      </div>
      {filteredImages.length > 0 ? (
        <div className="image-container">
          {filteredImages.map((img, index) => (
            <img key={index} src={img.url} alt={`Response code ${img.code}`} />
          ))}
        </div>
      ) : (
        filterText && <p>No images found for this response code.</p>
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
