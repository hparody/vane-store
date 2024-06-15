import PropTypes from "prop-types";
import { useMemo, useCallback } from "react";

import { AuthContext } from "@/contexts";
import useApi from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { isUserLoggedIn, isAdminRole } from "@/utils/user";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const { postRequest, loading, error } = useApi();

  const isLoggedIn = useMemo(() => isUserLoggedIn(user), [user]);

  const isAdmin = useMemo(() => isAdminRole(user), [user]);

  const login = useCallback(
    async ({ username: email, password }) => {
      try {
        const response = await postRequest("/auth/login", {
          email,
          password,
        });
        setUser(response);
        return { error: false, data: response };
      } catch (error) {
        console.error(error);
        return { error: true, data: error };
      }
    },
    [postRequest, setUser]
  );

  const logout = useCallback(async () => {
    try {
      // await postRequest("/api/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }, [setUser]);

  const signUp = useCallback(
    async ({ name, address, email, password }) => {
      try {
        const response = await postRequest("/auth/register", {
          name,
          address,
          email,
          password,
        });
        let userResponse;
        if (response === "User registered successfully") {
          userResponse = { name, address, email, role: "user" };
        } else {
          userResponse = null;
          return { error: false, data: null };
        }
        setUser(userResponse);
        return { error: false, data: userResponse };
      } catch (error) {
        setUser({ name, address, email, role: "user" }); // SET DUMMY USER
        console.error(error);
        return { error: true, data: error };
      }
    },
    [postRequest, setUser]
  );

  const contextValue = useMemo(
    () => ({
      user,
      error,
      isAdmin,
      isLoggedIn,
      loading,
      login,
      logout,
      signUp,
    }),
    [error, isAdmin, isLoggedIn, loading, login, logout, signUp, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
