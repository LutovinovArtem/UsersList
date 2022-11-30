import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS_NOT_OK } from "../../API/responseStatus";

import { registration as registrationAPI } from "../../API/user/authorization";

export const registration = createAsyncThunk(
  "registration/registration",
  async (values, { rejectWithValue }) => {
    try {
      const response = await registrationAPI(values);

      if (response.status === STATUS_NOT_OK) {
        throw new Error("Error");
      }

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      return rejectWithValue(`registration - ${error.message}`);
    }
  }
);

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.error = payload;
};

const registerSlice = createSlice({
  name: "registration",
  initialState: {
    error: null,
  },
  extraReducers: {
    [registration.rejected]: setError,
  },
});

export default registerSlice.reducer;
