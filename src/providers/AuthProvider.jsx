import PropTypes from "prop-types";
import { useEffect, useMemo, useCallback } from "react";

import { AuthContext } from "@/contexts";
import useApi from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { isUserLoggedIn, isAdminRole } from "@/utils/user";

const DUMMY_USER = {
  email: "hemelparody@hotmail.com",
  name: "Hemel Parody",
  address: "TV 24 # 18A - 26",
  role: "admin",
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

  const signUp = useCallback(
    async ({ name, address, email, password }) => {
      try {
        const response = await postRequest("/auth/register", {
          name,
          address,
          email,
          password,
        });
        setUser(response.data);
        return { error: false, data: response.data };
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
