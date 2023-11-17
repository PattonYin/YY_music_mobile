import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../AuthContext";

export default function UpdateSong() {
  const [song_artist, setArtistname] = useState("");
  const [song_name, setSongname] = useState("");
  const [song_rating, setRating] = useState("");
  const [song_username, setSongUsername] = useState("");
  const [id, setSongId] = useState("");
  const { username, setSection, setReload, updateInfo, setUpdate } = useAuth();

  useEffect(() => {
    if (updateInfo) {
      setArtistname(updateInfo.artist);
      setSongname(updateInfo.songname);
      setRating(updateInfo.rating);
      setSongUsername(updateInfo.username);
      setSongId(updateInfo.id);
      console.log("song info updated");
    }
  }, [updateInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (song_username != username) {
        alert("You don't have permission to update this review");
        return;
      }
      const response = await fetch(
        "http://172.21.48.189/YY_Music_JS/backend/index.php?action=updateSong",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            username: song_username,
            song_artist: song_artist,
            song_name,
            song_rating,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        console.log("Update success");
        setReload((prev) => !prev);
        setUpdate(null);
        setSection("Create Review");
      } else {
        console.log(data.message);
        alert("Update fail failed");
      }
    } catch (error) {
      console.error("Problem fetching data", error.message);
      alert("Update Data failed due to some problems.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(id);
    console.log(username);
    try {
      const response = await fetch(
        "http://172.21.48.189/YY_Music_JS/backend/index.php?action=deleteSong",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, username: song_username }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setReload((prev) => !prev);
        setUpdate(null);
        alert("Review deteled");
        setSection("Create Review");
      } else {
        alert("delete failed, you can only delete your own review");
        setUpdate(null);
        setSection("Create Review");
      }
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
      console.log(error);
      alert("Song delete failed due to a network or server issue.");
    }
  };

  return (
    <View>
      <Text>Update Review</Text>
      <Text>Here you can update your review.</Text>
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
      <Text>Rating:</Text>
      <TextInput
        keyboardType="numeric"
        value={song_rating.toString()}
        onChangeText={setRating}
        maxLength={1} // Assuming rating is a single digit
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
      {song_username == username ? (
        <TouchableOpacity onPress={handleDelete}>
          <Text>Delete</Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}

      <TouchableOpacity
        onPress={() => {
          setSection("Create Review");
        }}
      >
        <Text>Back to Lobby</Text>
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
