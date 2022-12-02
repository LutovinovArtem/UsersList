const selectPagesSlice = (state) => state.pages;

export const selectTotalPages = (state) => selectPagesSlice(state).totalPages;
export const selectNumberOfAllUsers = (state) => selectPagesSlice(state).numberOfAllUsers;
export const selectPerPage = (state) => selectPagesSlice(state).perPage