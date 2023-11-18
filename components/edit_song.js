import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../AuthContext";
import RNPickerSelect from "react-native-picker-select";

export default function UpdateSong() {
  const [song_artist, setArtistname] = useState("");
  const [song_name, setSongname] = useState("");
  const [song_rating, setRating] = useState("");
  const [song_username, setSongUsername] = useState("");
  const [id, setSongId] = useState("");
  const [song_category, setCategory] = useState("undefined");
  const { username, setSection, setReload, updateInfo, setUpdate, categories } =
    useAuth();
  const pickerItems = categories.map((category) => ({
    label: category,
    value: category,
  }));
  //console.log(pickerItems);
  useEffect(() => {
    if (updateInfo) {
      setArtistname(updateInfo.artist);
      setSongname(updateInfo.songname);
      setRating(updateInfo.rating);
      setSongUsername(updateInfo.username);
      setSongId(updateInfo.id);
      setCategory(updateInfo.category);
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
            song_category,
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
        setSection("viewSong");
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
        setSection("viewSong");
      } else {
        alert("delete failed, you can only delete your own review");
        setUpdate(null);
        setSection("viewSong");
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
    <View style={styles.container}>
      <Text style={styles.header}>Update or View Review</Text>
      <Text style={styles.subHeader}>
        You can update this review if you are the user who create it.
      </Text>
      <Text style={styles.label}>Artist:</Text>
      <TextInput
        style={styles.input}
        value={song_artist}
        placeholder="Enter artist name"
        onChangeText={setArtistname}
      />
      <Text style={styles.label}>Song:</Text>
      <TextInput
        style={styles.input}
        value={song_name}
        placeholder="Enter song name"
        onChangeText={setSongname}
      />
      <Text style={styles.label}>Rating:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={song_rating.toString()}
        placeholder="Enter rating"
        onChangeText={setRating}
        maxLength={1}
      />
      <Text>Category:</Text>

      <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={pickerItems}
        placeholder={{ label: "Select a category", value: updateInfo.category }}
        //make sure the placeholder is the original category//
      />
      {song_username === username && (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
      {song_username === username && (
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSection("viewSong");
        }}
      >
        <Text style={styles.buttonText}>Back to Lobby</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
