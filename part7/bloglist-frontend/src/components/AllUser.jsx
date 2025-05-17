import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAllUser } from "../reducers/allUserReducer";
import userService from "../services/user";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const dispatch = useDispatch();
  const allUser = useSelector((state) => state.allUser);

  useEffect(() => {
    dispatch(initializeAllUser());
  }, [dispatch]); 

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><strong>blogs created</strong></th>
          </tr>
        </thead>
        <tbody>
          {allUser.map(user => (
            <tr key={user.id}>
              <td>
  
                <Link  to={`/users/${user.id}`} style={{ textDecoration: "none"}}   >{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
