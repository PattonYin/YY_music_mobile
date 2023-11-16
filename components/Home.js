import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, FlatList, PanResponder} from "react-native";
import TopBar from './top_bar';
import AddSong from "./add_song";
import { useAuth } from "../AuthContext";
import Login from "./login";

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
        flex: 1,
        backgroundColor: "#95cef0",
        borderRadius: 10,
        
    },
    main: {
        flex: 10,
        backgroundColor: "green",
        borderRadius: 10,
    },
    list: {
        flex: 9,
        backgroundColor: "yellow",
        borderRadius: 10,
    },
});

export default function Home() {
    const [isLoading, setLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const { currentSection, setSection } = useAuth();

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            const { dx } = gestureState;

            if (dx < -40 && currentSection == "Create Review") { // Assuming -40 as the threshold for a left swipe
                // Change section logic
                setCurrentSection('Graph'); // Change to the section you want
            } 

            if (dx < -40 && currentSection == "Graph") {
                // Change section logic
                setCurrentSection('Create Review'); // Change to the section you want
            }
        },
    })).current;

    useEffect(() => {
        fetch("http://localhost/YY_Music_JS/backend/index.php?action=getRatings", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => setSongs(data))
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error.message);
          alert("Failed due to a network or server issue.");
        })
        .finally(() => setLoading(false));
        
      }, []);
      
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <View style={styles.header}>
                <TopBar/>
            </View>    
            <View {...panResponder.panHandlers} style={styles.main}>
                {/* {(currentSection == "Create Review") ? <AddSong/> : <Text>Graph</Text>} */}
                {/* <AddSong/> */}
                <Login/>
            </View>
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
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                        <Text>{item.song + " | " + item.artist + " | " + item.rating + " | " + item.username}</Text>
                        )}
                    />
                    </View>
                )}
            </View>
        </View>
    );

    // return(
    //     <View>
    //         <AddSong/>
    //     </View>
    // );
}
