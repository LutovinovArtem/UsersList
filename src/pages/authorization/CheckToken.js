import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const CheckToken = () => {
  const keyToken = localStorage.getItem("token");

  if (keyToken) {
    return <Navigate to="/users" replace />;
  }
  return <Outlet />;
};