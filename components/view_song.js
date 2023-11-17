import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useAuth } from "../AuthContext";

export default function ViewSong() {
  const [isLoading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const { setSection, reload, setReload, updateInfo, setUpdate } = useAuth();

  function handleView(item) {
    setSection("updateSong");
    setUpdate({
      songname: item.song,
      artist: item.artist,
      rating: item.rating,
      username: item.username,
      id: item.id,
    });
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
        setReload((prev) => !prev);
      });
  }, [reload]);

  return isLoading ? (
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
      <TouchableOpacity onPress={() => setSection("Create Review")}>
        <Text>Add Song</Text>
      </TouchableOpacity>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleView(item)}>
            <Text>
              {item.song +
                " | " +
                item.artist +
                " | " +
                item.rating +
                " | " +
                item.username}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
  // <Text>View Song</Text>
}
