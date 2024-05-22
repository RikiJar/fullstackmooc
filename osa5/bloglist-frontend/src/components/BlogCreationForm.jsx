import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogCreationForm = ({ createBlog, setNewBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blogObject)
    event.target.reset()
  }
  return(
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
                  title:
          <input
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='Enter title'
            /> <br/>
                  author:
          <input
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='Enter author'
            /> <br/>
                  url:
          <input
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='Enter url'
            /> <br/>
        </div>
        <div>
          <button type="submit">Submit</button> <br/>
          <button onClick={() => setNewBlog(false)} type="button">Cancel</button>
        </div>
      </form>
    </div>
  )
}
BlogCreationForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setNewBlog: PropTypes.func.isRequired
}

export default BlogCreationForm