import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = async () => {
    try {
      const returnedBlog = await blogService.updateLikes(blog.id);
      setBlogs(blogs.map(b => (b.id !== blog.id ? b : returnedBlog)));
    } catch (exception) {
      console.error('Error updating likes', exception);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the blog '${blog.title}'?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter(b => b.id !== blog.id));
      } catch (exception) {
        console.error('Error deleting blog', exception);
      }
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetails}>{showDetails ? 'Hide' : 'Show'} details</button>
      </div>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </p>
          <p>Added by {blog.user.name}</p>

          {/* Mostrar botón de eliminar solo si el usuario actual es el creador del blog */}
          {user && blog.user.id === user.id && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
