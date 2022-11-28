import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers as getUsersAPI,
  deleteUser as deleteUserAPI,
  postUser,
  putUser,
} from "../../API/user/instanceUsers";
// import { statusOK } from "../../API/responseStatus";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const users = await getUsersAPI();

      // if (users.status !== statusOK) {
      //   throw new Error("Error");
      // }

      if (users.length === 0) {
        throw new Error("Error");
      }
      // dispatch(addUser(users.config.data));
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

      if (response.status !== 204) {
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
      console.log("response: ", user.config.data);

      if (user.status !== 201) {
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

      if (user.status !== 201) {
        throw new Error("Error");
      }

      dispatch(changeUser(value));
    } catch (error) {
      return rejectWithValue(`addUser - ${error.message}`);
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
    // updateUsers: (state, { payload }) => {
    //   state.users = payload;
    // },
    removeUser: (state, { payload }) => {
      state.users = state.users.filter((user) => user.id !== payload);
    },
    addUser: (state, { payload }) => {
      state.users.push(payload);
    },
    changeUser: (state, { payload }) => {
      state.users = state.users.forEach((user) => {
        if (user.id === payload.id) {
          user = payload.value;
          console.log('payload: ', payload);
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

const { removeUser, addUser, updateUsers, changeUser } = usersSlice.actions;

export default usersSlice.reducer;
