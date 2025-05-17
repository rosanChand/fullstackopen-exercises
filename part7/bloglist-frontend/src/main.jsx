import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import notificationReducer from "./reducers/notificationReducer";
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import allUserReducer from "./reducers/allUserReducer";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        user: userReducer,
        allUser: allUserReducer
    }
})

ReactDOM.createRoot(document.getElementById("root")).render(
<Provider store={store}>
    <Router>
    <App />
    </Router>
</Provider>
);
