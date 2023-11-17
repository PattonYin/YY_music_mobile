import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, FlatList, PanResponder } from "react-native";
import TopBar from "./top_bar";
import AddSong from "./add_song";
import { useAuth } from "../AuthContext";
import Login from "./login";
import Register from "./register";
import { TouchableOpacity } from "react-native-web";
import ViewSong from "./view_song";
import UpdateSong from "./edit_song";

// Data: Fetch data from the backend
// Basic UI:
// Display the list of songs
// Button to add song
// Button to edit song
// Top_bar for logo and login
// Button for login logout
// Responsible for signup
// Logo

// Questions interesting / unresolved.
// 1. How to implement the switches among pages
// 2. How to do the UI switching among pages
// 3. Layout
// 4. Statistics Chart
// 4.1 Echarts
// 4.2 Fetch data related to categories from online data
// 5. Login logout logic, and session logic
// Once logged in, remain logged in
// Once logged out, remain logged out

// Issues to be resolved:
// 1. Layout of the main page\
// 2. Components
// 3. navigation logic
// 4. Login logout logica

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const { currentSection, setSection, reload, setReload } = useAuth();

  function renderSection() {
    switch (currentSection) {
      case "Create Review":
        return <AddSong />;
      case "Graph":
        return <Text>Graph</Text>;
      case "Login":
        return <Login />;
      case "Register":
        return <Register />;
      case "updateSong":
        return <UpdateSong />;
      default:
        return <Login />;
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View style={styles.header}>
        <TopBar />
      </View>
      <View style={styles.main}>{renderSection()}</View>
      <View style={styles.list}>
        <ViewSong />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: "#95cef0",
    borderRadius: 10,
  },
  main: {
    height: 380,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  list: {
    flex: 1,
    backgroundColor: "#a9bccc",
    borderRadius: 10,
    padding: 10,
  },
});
