import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        Password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <input type="submit" value="login" />
    </form>
  );

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };
  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      setBlogs((blogs) => blogs.concat(returnedBlog));

      setErrorMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("error creating blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLike = async (blogObject) => {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
    };
    const id = updatedBlog.id;
    const newBlog = await blogService.update(id, updatedBlog);
    setBlogs(
      blogs.map((blog) =>
        blog.id === newBlog.id ? { ...blog, likes: newBlog.likes } : blog,
      ),
    );
  };
  const handleDelete = async (blogObject) => {
    await blogService.remove(blogObject.id);
    setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
  };

  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        <h3>Log in to application</h3>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <p>
        {user.name} logged in{" "}
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogAppUser");
            setUser(null);
            blogService.setToken(null);
          }}
        >
          logout
        </button>
      </p>
      {blogForm()}
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => {
              handleLike(blog);
            }}
            handleDelete={() => {
              handleDelete(blog);
            }}
            currentUser={user}
          />
        ))}
    </div>
  );
};

export default App;
