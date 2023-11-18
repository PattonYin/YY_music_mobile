import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../AuthContext";
import Logo from "./logo";

export default function TopBar() {
  const {
    username,
    setUsername,
    isLogin,
    setLogin,
    currentSection,
    setSection,
  } = useAuth();

  const handleLogout = () => {
    setUsername(null);
    setLogin(false);
    setSection("Login");
  };

  function renderLogin() {
    if (currentSection == "Login") {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSection("Register");
          }}
        >
          <Text style={styles.buttonText}> Register </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSection("Login");
          }}
        >
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <View style={styles.topbar}>
      <Logo style={styles.logo} />
      {/*Avoid too long username*/}
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.login}>
        Welcome {username}
      </Text>
      {isLogin ? (
        <View>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}> Logout </Text>
          </TouchableOpacity>
        </View>
      ) : (
        renderLogin()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: "row",
    justifyContent: "flex-start", // Align items to the start
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 30, // BY giving the padding on left, we make space for back button
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 100,
    resizeMode: "contain",
  },
  login: {
    flex: 1, // Take up all the space in the header
    fontSize: 14,
    color: "#333333",
    fontWeight: "bold",
    textAlign: "center", // Center the welcome text
    marginHorizontal: 8, // Add horizontal margin to avoid touching the logo and button
  },
  button: {
    width: 80,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#4a90e2",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
});
