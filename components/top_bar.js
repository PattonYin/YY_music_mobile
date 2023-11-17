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
    } else if (currentSection == "Register") {
      return <Text> 大笨蛋 </Text>;
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
      <View style={styles.gap} />
      {isLogin ? (
        <View>
          <Text style={styles.login}>Welcome, {username}</Text>
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
  },
  logo: {
    flex: 1,
  },
  gap: {
    flex: 3,
  },
  login: {
    flex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: "#4a90e2",
    paddingHorizontal: 2,
    borderRadius: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
  },
});
