
import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';

const initialState = []

const allUserSlice = createSlice({
  name: 'alluser',
  initialState,
  reducers: {
    setAllUser(state, action) {
      return action.payload;
    },
    clearAllUser(state) {
      return [];
    },
  },
});

export const { setAllUser, clearAllUser } = allUserSlice.actions;

export const initializeAllUser = () => {
  return async (dispatch) => {
    const res = await userService.getAll();
    dispatch(setAllUser(res));
  };
}

export default allUserSlice.reducer;
