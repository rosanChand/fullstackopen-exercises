import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {clearUser} from '../reducers/userReducer'
import blogService from '../services/blogs'
import { Button } from 'react-bootstrap'
const Menu = () => {
    const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const padding = {
    paddingRight: 5,
    textDecoration: "none"
  }
  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {/* <Link style={padding} to="/about">about</Link> */}
      {user.name} logged in{" "}
              <Button
                onClick={() => {
                  window.localStorage.removeItem("loggedBlogAppUser");
                  dispatch(clearUser());
                  blogService.setToken(null);
                }}
              >
                logout
              </Button>
    </div>
  )
}

export default Menu