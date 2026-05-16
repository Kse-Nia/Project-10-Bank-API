import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks"; // Access Redux state for User auth

const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.user);

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;