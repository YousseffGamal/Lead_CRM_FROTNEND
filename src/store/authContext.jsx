import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || "",
     user: JSON.parse(localStorage.getItem("user") ? localStorage.getItem("user") : '') || null,
  });

  const login = async (cred) => {
    try {
      const { data } = await axiosInstance.post("/signinAdmin", cred);
      console.log(data)
      setAuth({
        token: data.user.token,
        user: data.user.userExist,
      });
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user.userExist));

      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };


  const logout = () => {

     axiosInstance.post('logoutAdmin')
    .then((res) =>{
      setAuth({ token: "", user: null,companyId:'' }); // Reset permissions state
      localStorage.removeItem("token");
      localStorage.removeItem("user");

    })
    .catch((err) =>{
      setAuth({ token: "", user: null,companyId:'' }); // Reset permissions state
      localStorage.removeItem("token");
      localStorage.removeItem("user");

    })
    
  };

  const hasPermissions = (permissionNames) =>{
    return permissionNames.some(permission => auth.permissions.includes(permission))
  }


  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) { // Token expired or unauthorized
         
          logout(); // Logout the user and redirect to login page
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on component unmount
    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [logout]);


  return (
    <AuthContext.Provider value={{ auth, login, logout,hasPermissions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);