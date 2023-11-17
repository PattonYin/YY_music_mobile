import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../AuthContext";

export default function Login() {
  const { setUsername, setLogin, setSection } = useAuth();
  const [localUsername, setLocalUsername] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (localUsername === "" || localPassword === "") {
        setMessage("Please fill in all the blanks");
        return;
      }

      const response = await fetch(
        "http://172.21.48.189/YY_Music_JS/backend/index.php?action=login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: localUsername,
            password: localPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setUsername(localUsername);
        setLogin(true);
        setSection("viewSong");
        setMessage("login success");
      } else {
        setMessage("Login failed," + data.message);
      }
    } catch (error) {
      setMessage("Login failed due to a network or server issue.", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        value={localUsername}
        placeholder="username"
        onChangeText={setLocalUsername}
      />
      <TextInput
        style={styles.input}
        value={localPassword}
        placeholder="password"
        onChangeText={setLocalPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {message !== "" && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  message: {
    color: "red",
    fontSize: 14,
  },
  loginText: {
    marginTop: 20,
    color: "#4a90e2",
  },
});
