import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog,setNewBlog] = useState({})

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username,password
      })
      window.localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }      
}
const loginForm = () => (
  <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type='text'
            value={username}
            name='username'
            onChange={(e) => {setUsername(e.target.value)}}
            />
        </div>
        <div>
          Password
          <input 
          type='password'
          value={password}
          name='Password'
          onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
      <input type="submit" value="login"/>
      </form>
)
const handleInputChange = (event) => {
  const { name, value } = event.target
  setNewBlog({ ...newBlog, [name]: value })
}

const blogForm = () => {
  return (
    <>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
        Title
        <input type="text" name="title" value={newBlog.title} onChange={handleInputChange} />
      </div>
      <div>
        Author
        <input type="text" name="author" value={newBlog.author} onChange={handleInputChange} />
      </div>
      <div>
        Url
        <input type="text" name="url" value={newBlog.url} onChange={handleInputChange} />
      </div>
      <button type="submit">save</button>
    </form>
    </>
  )
}
const addBlog = async (event) => {
  event.preventDefault()
  try{
    const blogObject = {
      ...newBlog
  }
  const returnedBlog = await blogService.create(blogObject)
  setBlogs(blogs.concat(returnedBlog))
  setNewBlog({})
  setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
} catch (exception) {
    setErrorMessage('error creating blog')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

if (user === null) {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} />
      {loginForm()}
    </div>
  )
}

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>{user.name} logged in <button onClick={() => {window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        blogService.setToken(null)
      }}>
        logout
        </button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App