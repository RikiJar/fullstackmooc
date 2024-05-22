import React, { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, removeBlog, onLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showBlog, setShowBlog] = useState(false)
  const [blogLikes, setLikes] = useState(blog.likes)
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  const handleLike = () => {
    onLike(blog.id)
    setLikes(blogLikes + 1)
  }

  return (
    <div id="blog" style={blogStyle}>
      <p id="blog information">{blog.title} {blog.author}</p>
      {showBlog ? (
        <>
          <button id="hideButton" onClick={() => setShowBlog(false)}>hide</button>
          <div>
            <p>{blog.url}</p>
            <p>{blogLikes} likes <button onClick={handleLike}>like</button></p>
            <p>Added by {blog.user.username}</p>
            {user.username !== blog.user.username ? null : <button id="removeButton" onClick={handleRemove}>remove</button>}
          </div>
        </>
      ) : (
        <button id="viewButton" onClick={() => setShowBlog(true)}>view</button>
      )}
    </div>
  )
}

export default Blog
