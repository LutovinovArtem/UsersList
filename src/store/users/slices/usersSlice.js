import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers as getUsersAPI,
  deleteUser as deleteUserAPI,
  postUser,
  putUser,
} from "../../../API/user/instanceUsers";
import { STATUS_NOT_OK } from "../../../API/responseStatus";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (data, { rejectWithValue }) => {
    try {
      const users = await getUsersAPI(data);

      if (users.status === STATUS_NOT_OK) {
        throw new Error("Error");
      }

      return users;
    } catch (error) {
      return rejectWithValue(`getUsers - ${error.message}`);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await deleteUserAPI(id);

      if (response.status === STATUS_NOT_OK) {
        throw new Error("Error");
      }

      dispatch(removeUser(id));
    } catch (error) {
      return rejectWithValue(`deleteUser - ${error.message}`);
    }
  }
);

export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (value, { rejectWithValue, dispatch }) => {
    try {
      const user = await postUser(value);

      if (user.status === STATUS_NOT_OK) {
        throw new Error("Error");
      }

      dispatch(addUser(value));
    } catch (error) {
      return rejectWithValue(`addUser - ${error.message}`);
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ value, id }, { rejectWithValue, dispatch }) => {
    try {
      const user = await putUser(value, id);

      if (user.status === STATUS_NOT_OK) {
        throw new Error("Error");
      }

      dispatch(changeUser({ ...value, id }));
    } catch (error) {
      return rejectWithValue(`editUser - ${error.message}`);
    }
  }
);

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.isLoading = false;
  state.error = payload;
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    changeUsers: (state, { payload }) => {
      console.log("payload: ", payload);
      state.users = payload;
    },
    removeUser: (state, { payload }) => {
      state.users = state.users.filter((user) => user.id !== payload);
    },
    addUser: (state, { payload }) => {
      state.users.push(payload);
    },
    changeUser: (state, { payload }) => {
      state.users = state.users.forEach((user) => {
        if (user.id === payload.id) {
          user = payload;
        }
      });
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    [getUsers.rejected]: setError,
    [deleteUser.rejected]: setError,
    [addUserAsync.rejected]: setError,
    [editUser.rejected]: setError,
  },
});

export const { removeUser, addUser, changeUser, changeUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
