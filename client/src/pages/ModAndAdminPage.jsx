import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const ModAndAdminPage = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (
    user?.authorites?.includes("ROLE_ADMIN") ||
    user?.authorites?.includes("ROLE_MODERATOR")
  ) {
    return children;
  }
  return <Navigate to="/notallowed" />;
};

export default ModAndAdminPage;