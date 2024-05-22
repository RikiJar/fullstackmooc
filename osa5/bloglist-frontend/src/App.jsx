import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogCreationForm from './components/BlogCreationForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(false)
  const [successNotification, setSuccessNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserData = window.localStorage.getItem('loggedUser')
    if (loggedUserData) {
      const user = JSON.parse(loggedUserData)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      if (error.response.status === 401) {
        setErrorNotification('Wrong credentials')
        setTimeout(() => {
          setErrorNotification(null)
        }, 3000)
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setSuccessNotification('Logout successful')
    setTimeout(() => {
      setSuccessNotification(null)
    }, 3000)
  }

  const addBlog = (blogObject) => {
    setNewBlog(false)
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat({...returnedBlog, user: user}))
        setSuccessNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setSuccessNotification(null)
        }, 3000)
      })
      .catch(error => {
        setErrorNotification('Error creating blog')
        setTimeout(() => {
          setErrorNotification(null)
        }, 3000)
      })
  }

  const loginForm = () => {
    return (
      <div>
        {errorNotification && <div className="errorDiv" style={{ backgroundColor: 'red', padding: 10, marginTop: '10px' }}>{errorNotification}</div>}
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
              username
            <input
			  data-testid='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
              password
            <input
			  data-testid='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const handleRemove = (id) => {
    blogService.remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        setSuccessNotification('Blog removed successfully')
        setTimeout(() => {
          setSuccessNotification(null)
        }, 3000)
      })
      .catch(error => {
        setErrorNotification('Error removing blog')
        setTimeout(() => {
          setErrorNotification(null)
        }, 3000)
      })
  }

  const handleLike = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    // console.log(blog)
    blogService.update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : {...returnedBlog, user: blog.user}))
      })
      .catch(error => {
        setErrorNotification('Error updating blog')
        setTimeout(() => {
          setErrorNotification(null)
        }, 3000)
      })
  }

  return (
    <>
      {user ? (
        <div >
          <h2>blogs</h2>
          {successNotification && <div className="successDiv" style={{ backgroundColor: 'lightgreen', padding: 10, marginTop: '10px' }}>{successNotification}</div>}
          {errorNotification && <div className="errorDiv" style={{ backgroundColor: 'red', padding: 10, marginTop: '10px' }}>{errorNotification}</div>}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {user.username} has logged in
            <button onClick={handleLogout}>Logout</button>
          </div>
          <br/>
          {newBlog ? (
            <BlogCreationForm setNewBlog={setNewBlog} createBlog={addBlog} />
          ) : (
            <button onClick={() => setNewBlog(true)}>New blog</button>
          )}
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} removeBlog={handleRemove} onLike={handleLike}/>
          )}
        </div>
      ) : loginForm()}
    </>
  )
}

export default App
