import { useState,useRef } from "react";

import { useDispatch } from "react-redux";
import Togglable from "./Togglable";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import {Form,Button} from "react-bootstrap"
const BlogForm = () => {
  const [newBlog, setNewBlog] = useState("");
  const dispatch = useDispatch();

  const blogFormRef = useRef();
    const addBlog = async (event) => {
       event.preventDefault();
    const blogObject = {
      ...newBlog,
    };

    setNewBlog({});
    try {
      blogFormRef.current.toggleVisibility();
      // const returnedBlog = await blogService.create(blogObject);
      // setBlogs((blogs) => blogs.concat(returnedBlog));
      dispatch(createBlog(blogObject));

      
      dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`))
      
    } catch (exception) {
      dispatch(setNotification("error creating blog"));
      // setErrorMessage("error creating blog");
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };
  return (
    <>
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <h2>create new</h2>
      <Form id="form" onSubmit={addBlog}>
         <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        id="title"
                        type="text"
                        value={newBlog.title}
                        name="title"
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author:</Form.Label>
                    <Form.Control
                        id="author"
                        type="text"
                        value={newBlog.author}
                        name="title"
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>URL:</Form.Label>
                    <Form.Control
                        id="url"
                        type="text"
                        value={newBlog.url}
                        name="url"
                        onChange={handleInputChange} />
                </Form.Group>
     
        <Button variant="primary" type="submit">save</Button>
      </Form>
      </Togglable>
    </>
  );
};

export default BlogForm;
