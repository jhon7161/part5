import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, setBlogs, blogs, user, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)
  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button type="button" onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user && user.username === blog.user.username && (
            <button type="button" onClick={() => handleDelete(blog.id)}>delete</button>
          )}
        </div>
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
  handleDelete: PropTypes.func.isRequired
}
export default Blog
