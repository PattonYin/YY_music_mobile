import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../AuthContext";

export default function AddSong() {
  const [song_artist, setArtistname] = useState("");
  const [song_name, setSongname] = useState("");
  const [song_rating, setRating] = useState("");
  const { username, setReload } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (song_artist === "" || song_name === "" || song_rating === "") {
        alert("Please fill in all the blanks");
        return;
      }
      if (
        song_rating !== "1" &&
        song_rating !== "2" &&
        song_rating !== "3" &&
        song_rating !== "4" &&
        song_rating !== "5"
      ) {
        alert("Please enter a valid rating");
        return;
      }
      const response = await fetch(
        "http://172.21.48.189/YY_Music_JS/backend/index.php?action=createSong",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            song_artist,
            song_name,
            song_rating,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // from the backend:
      // data.success, data.info.
      const data = await response.json();
      if (data.success) {
        console.log("Update success");
        setReload(true);
        setSongname("");
        setArtistname("");
        setRating("");
      } else {
        console.log(data.message);
        alert("Create failed, avoid duplicate review");
      }
    } catch (error) {
      console.error("Problem fetching data", error.message);
    }
  };

  return (
    <View>
      <Text>Create Review</Text>
      <Text>Here you can create your review.</Text>
      <Text>Artist:</Text>
      <TextInput
        value={song_artist}
        placeholder="artist"
        onChangeText={setArtistname}
      />
      <Text>Song:</Text>
      <TextInput
        value={song_name}
        placeholder="song_name"
        onChangeText={setSongname}
      />
      <Text>Rating(1-5):</Text>
      <TextInput
        keyboardType="numeric"
        value={song_rating.toString()}
        onChangeText={setRating}
        maxLength={1}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "left",
    justifyContent: "left",
    paddingBottom: 20,
    paddingTop: 20,
  },
});
