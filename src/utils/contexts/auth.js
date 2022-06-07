import nookies from "nookies";
import React, { createContext, useContext, useState } from "react";
import api from "../../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [emailRecovering, setEmailRecovering] = useState("");
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login({ email, password }) {
    const data = await api.post("/login", {
      email,
      password,
    });

    const { access_token, expires_in, user } = data.data;

    nookies.set(undefined, "token", access_token, {
      maxAge: expires_in,
      path: "/"
    });


    /* fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: access_token, expires_in }),
    }); */

    api.defaults.headers["Authorization"] = `Bearer ${access_token}`;

    setIsAuthenticated(true);

    setUser(user);
  }

  async function signup({ name, email, password, passwordConfirm, role }) {
    return await api.post("/register", {
      name,
      email,
      password,
      password_confirmation: passwordConfirm,
      role,
    });
  }

  async function logout() {

    nookies.destroy(undefined, 'token');

    setUser({});

  }

  async function forgotPassword({ email }) {
    return await api.post("sendPasswordResetLink", {
      email,
    });
  }

  async function resetPassword({
    email,
    resetToken,
    password,
    passwordConfirmation,
  }) {
    return await api.post("resetPassword", {
      email,
      resetToken,
      password,
      password_confirmation: passwordConfirmation,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        emailRecovering,
        setEmailRecovering,
        isAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default AuthContext;
