import PropTypes from "prop-types";
import { useEffect, useMemo, useCallback } from "react";

import { AuthContext } from "@/contexts";
import useApi from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { isUserLoggedIn, isAdminRole } from "@/utils/user";

const DUMMY_USER = {
  username: "hemelparody@hotmail.com",
  name: "Parody",
  role: "admin",
  token: "123456",
  passwordCorrect: true,
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const { getRequest, postRequest, loading, error } = useApi();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getRequest("/api/user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoggedIn = useMemo(() => isUserLoggedIn(user), [user]);

  const isAdmin = useMemo(() => isAdminRole(user), [user]);

  const checkPassword = useCallback(
    async (username, password) => {
      try {
        const response = await postRequest("/api/check-password", {
          username,
          password,
        });
        setUser(response.data);
      } catch (error) {
        setUser(DUMMY_USER); // SET DUMMY USER
        console.error(error);
      }
    },
    [postRequest, setUser]
  );

  const login = useCallback(
    async (username, password) => {
      try {
        const response = await postRequest("/api/login", {
          username,
          password,
        });
        setUser(response.data);
      } catch (error) {
        setUser(DUMMY_USER); // SET DUMMY USER
        console.error(error);
      }
    },
    [postRequest, setUser]
  );

  const logout = useCallback(async () => {
    try {
      await postRequest("/api/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      setUser(null); // DUMMY LOGOUT
      console.error(error);
    }
  }, [postRequest, setUser]);

  const contextValue = useMemo(
    () => ({
      user,
      error,
      isAdmin,
      isLoggedIn,
      loading,
      login,
      logout,
    }),
    [error, isAdmin, isLoggedIn, loading, login, logout, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
