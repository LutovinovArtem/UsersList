import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getPages as getPagesAPI } from "../../API/user/instanceUsers";
import { STATUS_NOT_OK } from "../../API/responseStatus";

export const getPages = createAsyncThunk(
  "pages/getPages",
  async (_, { rejectWithValue }) => {
    try {
      const pages = await getPagesAPI();

      if (pages.status === STATUS_NOT_OK) {
        throw new Error("Error");
      }

      return pages.data;
    } catch (error) {
      return rejectWithValue(`getPages - ${error.message}`);
    }
  }
);

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.error = payload;
};

const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    totalPages: 1,
    perPage: 1,
    numberOfAllUsers: null,
    error: null,
  },
  extraReducers: {
    [getPages.pending]: (state) => {
      state.error = null;
    },
    [getPages.fulfilled]: (state, { payload }) => {
      state.totalPages = payload.total_pages;
      state.numberOfAllUsers = payload.total;
      state.perPage = payload.per_page;
    },
    [getPages.rejected]: setError,
  },
});

export default pagesSlice.reducer;
