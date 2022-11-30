import { createSelector } from "@reduxjs/toolkit";

const selectUsersSlice = (state) => state.users;

const selectUsers = (state) => selectUsersSlice(state).users;
const selectUsersError = (state) => selectUsersSlice(state).error;
const selectUsersIsLoading = (state) => selectUsersSlice(state).isLoading;

export const reselectUsers = createSelector([selectUsers], (users) => {
  if (users) return users;
});

export const reselectError = createSelector([selectUsersError], (error) => {
  if (error) return error;
});

export const reselectIsLoading = createSelector(
  [selectUsersIsLoading],
  (isLoading) => {
    if (isLoading === true) return isLoading;
  }
);
