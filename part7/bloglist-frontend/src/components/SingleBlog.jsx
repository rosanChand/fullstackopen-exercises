import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog,addCommentToBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Form,Button } from "react-bootstrap";

const SingleBlog = () => {
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!blog) return <div>Blog not found</div>;

  const handleLike = () => {
    dispatch(likeBlog(blog));
    dispatch(setNotification(`You liked "${blog.title}"`));
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog));
    dispatch(setNotification(`You deleted "${blog.title}"`));
  };
  const handleComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value
   event.target.comment.value = ''
    dispatch(addCommentToBlog(id, comment));
  };

  const isOwner = blog.user.username === user.username;

  return (
    <>
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a     style={{ textDecoration: "none"}}
       href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <Button onClick={handleLike}>like</Button></p>
      <p>added by {blog.user.name}</p>
      {isOwner && <Button onClick={handleDelete}>remove</Button>}
    </div>

    <div><h3>comments</h3>
    <Form onSubmit={handleComment}>
    <Form.Group>
      <Form.Label>Comment:</Form.Label>
      <Form.Control
        id="comment"  
        type="text"
         name="comment" />
         </Form.Group>
          <Button>add comment</Button>
    </Form>
  
    <ul>
      {blog.comments.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))}
    </ul>
      </div>
    </>
  );
};

export default SingleBlog;
