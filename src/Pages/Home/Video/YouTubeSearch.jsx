import React, { useState } from "react";

const YouTubeSearch = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Local state for search query

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query as user types
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search YouTube..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default YouTubeSearch;
