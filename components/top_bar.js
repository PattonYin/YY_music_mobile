import React, { useState } from "react";
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
    categories,
    statsData,
    setStatsData,
  } = useAuth();

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://172.21.48.189/YY_music_mobile/backend/index.php?action=getCateNum",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categories }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok (getCateNum)");
      }
      const backendData = await response.json();

      // Map the categories to include the count from the backend data
      const dataWithCounts = categories.map((cate) => ({
        category: cate,
        count: backendData[cate] || 0, // Default to 0 if the category is not found
      }));

      setStatsData(dataWithCounts);
      setSection("Graph");
      console.log(statsData);
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation (getCateNum):",
        error.message
      );
      alert("Failed due to a network or server issue (getCateNum). ");
    } finally {
    }
  };

  // renders the button based on the current section
  function renderButton() {
    if (currentSection !== "Graph") {
      return (
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}> Statistics </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSection("viewSong");
          }}
        >
          <Text style={styles.buttonText}> Back </Text>
        </TouchableOpacity>
      );
    }
  }

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
      <View style={styles.logo}>{renderButton()}</View>
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
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 100,
    resizeMode: "contain",
    marginLeft: 0,
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
    backgroundColor: "#333333",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
});
