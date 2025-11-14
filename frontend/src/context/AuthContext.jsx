import { createContext, useEffect, useState } from "react";
import axios from "axios";
const server_url = import.meta.env.VITE_SERVER_URL;

/* eslint-disable react-refresh/only-export-components */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [authLoading, setAuthloading] = useState(true);

  useEffect(() => {
    async function auto_signin() {
      const existToken = localStorage.getItem("authToken");

      if (!existToken) {
        setAuthloading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await axios.get(`${server_url}/auth/validate`, {
          headers: {
            Authorization: `Bearer ${existToken}`,
          },
        });

        setToken(existToken);
        setUser(res.data.data.user);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem("authToken");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        console.log(err.message);
      } 
        setAuthloading(false);
      
    }

    auto_signin();
  }, []);

  const signin = async (formData) => {
    try {
      const res = await axios.post(`${server_url}/auth/sign-in`, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("authToken", res.data.data.token);
      setUser(res.data.data.user);
      setToken(res.data.data.token);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);

      const backendMessage = err.response?.data?.message;
      return backendMessage || err.message;
    }
  };
  const signup = async (formData) => {
    try {
      const res = await axios.post(`${server_url}/auth/sign-up`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("authToken", res.data.data.token);
      setUser(res.data.data.user);
      setToken(res.data.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      const backendMessage = error.response?.data?.message;
      return backendMessage || error.message;
    }
  };
  const signout = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        authLoading,
        signin,
        signup,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
