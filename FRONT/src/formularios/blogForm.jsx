import React from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = React.useState({
    title: '',
    author: '',
    url: ''
  })

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
          data-testid="title"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
          data-testid="author"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="URL"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
          data-testid="url"
        />
      </div>
      <button type="submit" data-testid="submit-button">Save Blog</button>
    </form>
  )
}
export default BlogForm
