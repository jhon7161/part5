import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetails}>{showDetails ? 'Hide' : 'Show'} details</button>
      </div>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button>like</button></p>
        </div>
      )}
    </div>
  );
};

export default Blog;
