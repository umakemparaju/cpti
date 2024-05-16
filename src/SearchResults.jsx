import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.map((result) => (
        <div key={result.id.videoId}>
          <h2>{result.snippet.title}</h2>
          <img src={result.snippet.thumbnails.default.url} alt="Thumbnail" />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
