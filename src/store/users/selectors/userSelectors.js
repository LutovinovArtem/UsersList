const selectUserSlice = (state) => state.user;

export const selectUser = (state) => selectUserSlice(state).user;
export const selectUserError = (state) => selectUserSlice(state).error;
export const selectUserIsLoading = (state) => selectUserSlice(state).isLoading;

