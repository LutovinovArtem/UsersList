import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users/slices/usersSlice";
import userReducer from "./users/slices/userSlice";
import loginReducer from "./authorization/loginSlice";
import registerReducer from "./authorization/registerSlice";
import pagesReducer from "./pages/pagesSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    login: loginReducer,
    registration: registerReducer,
    pages: pagesReducer,
  },
});
