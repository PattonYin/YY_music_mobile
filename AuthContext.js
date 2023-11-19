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
  const [updateInfo, setUpdate] = useState({});
  const categories = [
    "rock",
    "jazz",
    "classical",
    "hip-hop",
    "electronic",
    "country",
    "blues",
    "pop",
    "folk",
    "undefined",
  ];

  const value = {
    username,
    setUsername,
    isLogin,
    setLogin,
    currentSection,
    setSection,
    updateInfo,
    setUpdate,
    categories,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
