import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useAuth } from "../AuthContext";

export default function ViewSong() {
  const [isLoading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isLogin, setSection, setUpdate } = useAuth();

  function handleView(item) {
    setSection("updateSong");
    setUpdate({
      songname: item.song,
      artist: item.artist,
      rating: item.rating,
      username: item.username,
      id: item.id,
      category: item.category,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://172.21.48.189/YY_music_mobile/backend/index.php?action=getRatings",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
        alert("Failed due to a network or server issue.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleSearch(term) {
    setSearchTerm(term);
  }

  // Filter the songs based on the search term
  const filteredSongs = songs.filter(
    (song) =>
      song.song.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.rating.toString().includes(searchTerm.toLowerCase())
  );

  const SongCard = ({ song, artist, rating, username, category, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{song}</Text>
      <Text style={styles.details}>
        {artist} - {category}
      </Text>
      <Text style={styles.rating}>Rating: {rating}</Text>
      <Text style={styles.user}>Reviewed by: {username}</Text>
    </TouchableOpacity>
  );

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.container}>
      <Text style={styles.header}>YY_Music</Text>
      <TextInput
        style={styles.searchBox}
        placeholder="Search for songs, artists, cat., or users"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      {isLogin === true && (
        <TouchableOpacity
          onPress={() => setSection("Create Review")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add Song</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SongCard
            song={item.song}
            artist={item.artist}
            rating={item.rating}
            username={item.username}
            category={item.category}
            onPress={() => handleView(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    color: "green",
    textAlign: "center",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: "green",
  },
  user: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "#333333",
    padding: 10,
    marginHorizontal: 100,
    borderRadius: 10,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
  searchBox: {
    height: 40,
    width: "89%",
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 17,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});
