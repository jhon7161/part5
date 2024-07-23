import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EditBlogForm = ({ blog, updateBlog, toggleEditForm }) => {
  const [title, setTitle] = useState(blog.title);
  const [author, setAuthor] = useState(blog.author);
  const [url, setUrl] = useState(blog.url);

  useEffect(() => {
    setTitle(blog.title);
    setAuthor(blog.author);
    setUrl(blog.url);
  }, [blog]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedBlog = {
        title,
        author,
        url,
      };
      await updateBlog(blog.id, updatedBlog);
      toggleEditForm();
    } catch (exception) {
      console.error('Error updating blog', exception);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="edit-blog-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          data-testid="title-input"
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          data-testid="author-input"
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          data-testid="url-input"
        />
      </div>
      <button type="submit" data-testid="save-button">Save</button>
      <button type="button" onClick={toggleEditForm} data-testid="cancel-button">Cancel</button>
    </form>
  );
};

EditBlogForm.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  toggleEditForm: PropTypes.func.isRequired,
};

export default EditBlogForm;
