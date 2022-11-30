import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS_NOT_OK } from "../../../API/responseStatus";
import { getUser as getUserAPI } from "../../../API/user/instanceUsers";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const user = await getUserAPI(id);

      if (user.status === STATUS_NOT_OK) {
        throw new Error("Error");
      }

      return user;
    } catch (error) {
      return rejectWithValue(`getUser - ${error.message}`);
    }
  }
);

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.isLoading = false;
  state.error = payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: true,
    error: null,
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.error = null;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    },
    [getUser.rejected]: setError,
  },
});

export default userSlice.reducer;
