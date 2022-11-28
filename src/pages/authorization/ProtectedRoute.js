import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const keyToken = localStorage.getItem("token");

  if (!keyToken) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};