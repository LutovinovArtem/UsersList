import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS_NOT_OK } from "../../API/responseStatus";
import { login as loginAPI } from "../../API/user/authorization";

export const login = createAsyncThunk(
  "login/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await loginAPI(values);

      if (response.status === STATUS_NOT_OK) {
        throw new Error("Error");
      }

      localStorage.setItem("token", response.data.token);
      
      return response;
    } catch (error) {
      return rejectWithValue(`login - ${error.message}`);
    }
  }
);

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.error = payload;
};

const loginSlice = createSlice({
  name: "login",
  initialState: {
    error: null,
  },
  extraReducers: {
    [login.rejected]: setError,
  },
});

export default loginSlice.reducer;
