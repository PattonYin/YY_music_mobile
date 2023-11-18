import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../AuthContext";
import RNPickerSelect from "react-native-picker-select";

export default function AddSong() {
  const [song_artist, setArtistname] = useState("");
  const [song_name, setSongname] = useState("");
  const [song_rating, setRating] = useState("");
  const [song_category, setCategory] = useState("undefined");
  const { username, setSection, categories } = useAuth();
  // load categories from AuthContext.js
  const pickerItems = categories.map((category) => ({
    label: category,
    value: category,
  }));

  // Function to handle form submission
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
      // Send POST request to backend
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
            song_category,
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
        setSongname("");
        setArtistname("");
        setRating("");
        setCategory("undefined");
        setSection("viewSong");
      } else {
        console.log(data.message);
        alert("Create failed, avoid duplicate review");
      }
    } catch (error) {
      console.error("Problem fetching data", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Review</Text>
      <Text style={styles.subHeader}>Here you can create your review.</Text>
      <Text style={styles.label}>Artist:</Text>
      <TextInput
        style={styles.input}
        value={song_artist}
        placeholder="artist"
        onChangeText={setArtistname}
      />
      <Text>Song:</Text>
      <TextInput
        style={styles.input}
        value={song_name}
        placeholder="song_name"
        onChangeText={setSongname}
      />
      <Text>Rating(1-5):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={song_rating.toString()}
        onChangeText={setRating}
        maxLength={1}
      />
      <Text style={styles.label}>Category:</Text>
      <RNPickerSelect
        style={styles.label}
        onValueChange={(value) => setCategory(value)}
        items={pickerItems}
        placeholder={{ label: "Select a category", value: "undefined" }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setSection("viewSong")}
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
    backgroundColor: "#333333",
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
