
import PropTypes from "prop-types";

const Blog = ({blog}) => {
 
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };
 


  return (
    <div className="blogt">
      <div className="blog-test">
        {blog.title} {blog.author}{" "}
      </div>
      </div>
      )

}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
