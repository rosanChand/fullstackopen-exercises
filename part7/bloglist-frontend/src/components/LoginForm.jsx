
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import {Form,Button} from "react-bootstrap";
const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong credentials"));
      // setErrorMessage("wrong credentials");
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
      
    }
  };


    return (
    <Form onSubmit={handleLogin}>
        <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
                data-testid="username"
                type="text"
                value={username}
                name="Username"
                onChange={(e) => {
                    setUsername(e.target.value);
                }} />
        </Form.Group>
        <Form.Group>
            <Form.Label>password:</Form.Label>
            <Form.Control
                data-testid="password"
                type="password"
                value={password}
                name="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }} />
        </Form.Group>
        <Button variant="primary" type="submit">
            Login
            </Button>
    </Form>
  );

}
  export default LoginForm;
