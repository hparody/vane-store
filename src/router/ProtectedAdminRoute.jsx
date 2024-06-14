import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();

  // Redirect to admin dashboard if logged in
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
};

ProtectedAdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedAdminRoute;
