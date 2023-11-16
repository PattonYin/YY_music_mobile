import React, { useState, useEffect, useContext } from 'react';

const AuthContext = React.createContext();

// useAuth hook
export function useAuth() {
  return useContext(AuthContext);
}

// Create the Context
export function AuthProvider(props){
  const [username, setUsername] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [currentSection, setSection] = useState('Create Review');

  const value = {
    username,
    setUsername,
    isLogin,
    setLogin,
    currentSection,
    setSection
  }
  
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}
 