// VideoComponent.js

import React, { useState, useEffect } from 'react';

const VideoComponent = ({ category }) => {
  const [videos, setVideos] = useState([]);

  // Fetch videos based on the selected category (you can replace this with your API calls)
  useEffect(() => {
    // Example: Fetch videos from an API based on the category
    // Replace this with your actual API endpoint
    const fetchVideos = async () => {
      try {
        const response = await fetch(`https://api.example.com/videos?category=${category}`);
        const data = await response.json();
        setVideos(data); // Update the videos state with fetched data
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [category]);

  return (
    <div className="video-container">
      <h2>Videos related to {category}</h2>
      {videos.map((video) => (
        <div key={video.id} className="video-item">
          {/* Render video content */}
          <video controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>{video.title}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoComponent;

// Usage in your main component (e.g., App.js)
// Import VideoComponent and use it inside your layout
// Example: <VideoComponent category={selectedCategory} />
// Remember to style the video container and customize the API calls according to your needs.
