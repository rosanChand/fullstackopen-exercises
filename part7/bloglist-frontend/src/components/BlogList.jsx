import { useSelector } from 'react-redux';
import Blog from './Blog';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
        <Table striped bordered hover>
            <tbody>
                {sortedBlogs.map((blog) => (
                    <tr key={blog.id}>
                        <td>
                            <Link key={blog.id} style={{ textDecoration: "none"}} to={`/blogs/${blog.id}`}>
                            <Blog key={blog.id} blog={blog} />
                            </Link>
                            </td>
                            <td>
                            {blog.user.name}
                            </td>
                            </tr>
                ))}
               
            </tbody>

        </Table>
    
    </div>
  );
};

export default BlogList;
