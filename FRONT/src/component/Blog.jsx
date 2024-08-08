import React, { useState } from 'react'
import PropTypes from 'prop-types'
import EditBlogForm from '../formularios/EditBlogForm'

const Blog = ({ blog, setBlogs, blogs, user, handleLike, handleDelete, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm)
  }

  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      await updateBlog(id, updatedBlog)
      const updatedBlogs = blogs.map(b => (b.id === id ? { ...b, ...updatedBlog } : b))
      setBlogs(updatedBlogs)
      setShowEditForm(false)// Hide the edit form after saving
    } catch (exception) {
      console.error('Error updating blog', exception)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} data-testid={`blog-${blog.id}`}>
      <div>
        {blog.title} {blog.author}
        <button
          type="button"
          onClick={toggleDetails}
          data-testid={`toggle-details-${blog.id}`}
        >
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div data-testid={`like-container-${blog.id}`}>
           likes {blog.likes}{' '}
            <button
              type="button"
              onClick={() => handleLike(blog.id)}
              data-testid={`like-button-${blog.id}`}
            >
            like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user && user.username === blog.user.username && !showEditForm && (
            <div>
              <button
                type="button"
                onClick={toggleEditForm}
                data-testid={`edit-button-${blog.id}`}
              >
                edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(blog.id)}
                data-testid={`delete-button-${blog.id}`}
              >
                delete
              </button>
            </div>
          )}
        </div>
      )}
      {showEditForm && (
        <EditBlogForm
          blog={blog}
          updateBlog={handleUpdateBlog}
          toggleEditForm={toggleEditForm}
        />
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
}

export default Blog
