import { createSelector } from "@reduxjs/toolkit";

const selectUsersSlice = (state) => state.users;

const selectUsers = (state) => selectUsersSlice(state).users;
const selectError = (state) => selectUsersSlice(state).error;
const selectIsLoading = (state) => selectUsersSlice(state).isLoading;

export const reselectUsers = createSelector([selectUsers], (users) => {
  if (users.length) return users;
});

export const reselectError = createSelector([selectError], (error) => {
  if (error) return error;
});

export const reselectIsLoading = createSelector(
  [selectIsLoading],
  (isLoading) => {
    if (isLoading === true) return isLoading;
  }
);

// export const reselectUserById = createSelector(
//   [selectUsers],
//   (users, id) => {
//     console.log('users1', users);
//     // users.find(({ id: userID }) => userID === id);
//   }
// );
