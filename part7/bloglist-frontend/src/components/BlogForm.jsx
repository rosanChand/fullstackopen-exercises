import { useState } from "react";
import PropTypes from "prop-types";
const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      ...newBlog,
    };
    createBlog(blogObject);

    setNewBlog({});
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };
  return (
    <>
      <h2>create new</h2>
      <form id="form" onSubmit={addBlog}>
        <div>
          Title
          <input
            id="title"
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Author
          <input
            id="author"
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Url
          <input
            id="url"
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleInputChange}
          />
        </div>
        <button id="send" type="submit">
          save
        </button>
      </form>
    </>
  );
};
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
export default BlogForm;
