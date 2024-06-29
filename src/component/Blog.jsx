import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      {/* Verificar si blog.user está definido antes de mostrar el nombre */}
      {blog.user && <p>Created by: {blog.user.name}</p>}
    </div>
  );
};

export default Blog;
