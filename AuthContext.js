import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

// useAuth hook
export function useAuth() {
  return useContext(AuthContext);
}

// Create the Context
export function AuthProvider(props) {
  const [username, setUsername] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [currentSection, setSection] = useState("Login");
  const [reload, setreload] = useState(false);

  const value = {
    username,
    setUsername,
    isLogin,
    setLogin,
    currentSection,
    setSection,
    reload,
    setreload,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
