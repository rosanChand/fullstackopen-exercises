import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];
const blogSlice = createSlice({
  name:'blogs',
  initialState,
  reducers:{
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {

      return state.map((b) => (b.id !== action.payload.id ? b : action.payload));
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
  }

})
export const { addBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions;

export default blogSlice.reducer;

export const intializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
}

export const createBlog = (newBlog) => {
  return async dispacth => {
    const addedBlog = await blogService.create(newBlog);

    dispacth(addBlog(addedBlog));
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    dispatch(updateBlog(returnedBlog));
  };
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(removeBlog(blog.id));
  };
};

export const addCommentToBlog = (blogId, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blogId, comment)
    dispatch(updateBlog(updatedBlog))
  }
}