import { useState } from "react"
import PropTypes from 'prop-types'
const Blog = ({ blog, handleLike,handleDelete,currentUser }) => {
  const [visible,setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const isowner = blog.user.username === currentUser.username

  const hideWhenVisible = {display: visible? 'none': ''}
  const showWhenVisible = {display: visible? '' : 'none'}
  
  return (
  <div style={blogStyle} className="blogt">
    <div style={hideWhenVisible} className="blog-test">
    {blog.title} {blog.author} <button onClick={toggleVisibility}>
      view
    </button>
    </div>

    <div style={showWhenVisible}>
    {blog.title} {blog.author} <button onClick={toggleVisibility}>
      hide
    </button>
    
      <br />{blog.url}
      <br /><span className="likes">likes {blog.likes} </span><button onClick={handleLike}>like</button>
      <br />{blog.user.name}
      {(isowner) &&
      <button onClick={handleDelete}>remove</button>
      }
    </div>
  </div>  
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog