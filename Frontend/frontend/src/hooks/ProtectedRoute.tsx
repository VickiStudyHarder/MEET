import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.log("Is not authenticated");
    return <Navigate to="login" replace />;
  }
  console.log("Return outlet");
  return <Outlet />;
};

export default ProtectedRoutes;
