import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
// import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch,useSelector } from "react-redux";
import {intializeBlogs,createBlog,likeBlog,deleteBlog}from "./reducers/blogReducer";
import {setUser,clearUser} from "./reducers/userReducer";
import { initializeAllUser } from "./reducers/allUserReducer";

import LoginForm from "./components/LoginForm";
import Menu from "./components/Menu";
import userService from "./services/user";
import BlogList from "./components/BlogList";
import AllUsers from "./components/AllUser";
import SingleBlog from "./components/SingleBlog";

import { Routes, Route, Link ,useParams} from "react-router-dom";


const App = () => {

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const user = useSelector((state) => state.user);

  const allUser = useSelector((state) => state.allUser);
  // const [blogs, setBlogs] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [user, setUser] = useState(null);

 
  useEffect(() => {
    dispatch(intializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);
  const UserBlogs = () => {
    const id = useParams().id
    const userToShow = allUser.find(u => u.id === id)
    if(!userToShow){
      return null
    }
    return (
      <div>
        <h2>{userToShow.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {userToShow.blogs.map((blog) => (
            <li key={blog.id}>
             {blog.title}
            </li>
          ))}
        </ul>
        
      </div>
    );
  }



  return (
    <div className="container">
      <h2>Blogs</h2>
      {user === null ? (
        <>
  
        <h3>Log in to application</h3>
        <Notification />
        <LoginForm />
        </>
      ):<>
        <Menu/> 
      <Notification />
    
      
        <BlogForm />
        <Routes>

          <Route path="/users/:id" element = {<UserBlogs/>}/>
          <Route path="/" element={<BlogList/>} />
          <Route path="/users" element={<AllUsers/>} />

          <Route path="/blogs/:id" element={<SingleBlog/>} />
          
        </Routes>
      </>}
      
     
      
      
    </div>
  );
};

export default App;
