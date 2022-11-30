import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./pages/authorization/ProtectedRoute";
import { CheckToken } from "./pages/authorization/CheckToken";

import Login from "./pages/authorization/login/Login";
import Registration from "./pages/authorization/registration/Registration";
import UsersList from "./pages/users/usersList/UsersList";
import AddUser from "./pages/users/addUser/AddUser";
import EditUser from "./pages/users/editUser/EditUser";

function App() {
  return (
    <Router>
      <Routes> 
        {/* название */}
        <Route element={<CheckToken />}>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/users" element={<UsersList />} index />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
