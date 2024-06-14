import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const ProtectedLogin = ({ children }) => {
  const { isAdmin, isLoggedIn } = useAuth();

  // Redirect to admin dashboard if logged in
  if (isAdmin && isLoggedIn) {
    return <Navigate to="/admin/products" />;
  }
  return children;
};

ProtectedLogin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedLogin;
