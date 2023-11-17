import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, FlatList, PanResponder } from "react-native";
import TopBar from "./top_bar";
import AddSong from "./add_song";
import { useAuth } from "../AuthContext";
import Login from "./login";
import Register from "./register";

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

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const { currentSection, setSection, reload, setReload } = useAuth();

  function renderSection() {
    switch (currentSection) {
      case "Create Review":
        return <AddSong />;
        break;
      case "Graph":
        return <Text>Graph</Text>;
        break;
      case "Login":
        return <Login />;
        break;
      case "Register":
        return <Register />;
        break;
      default:
        return <Login />;
        break;
    }
  }

  useEffect(() => {
    fetch(
      "http://172.21.48.189/YY_Music_JS/backend/index.php?action=getRatings",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setSongs(data))
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
        alert("Failed due to a network or server issue.");
      })
      .finally(() => {
        setLoading(false);
        setReload(false);
      });
  }, [reload]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View style={styles.header}>
        <TopBar />
      </View>
      <View style={styles.main}>{renderSection()}</View>
      <View style={styles.list}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
              YY_Music
            </Text>
            <FlatList
              data={songs}
              renderItem={({ item }) => (
                <Text>
                  {item.song +
                    " | " +
                    item.artist +
                    " | " +
                    item.rating +
                    " | " +
                    item.username}
                </Text>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}
