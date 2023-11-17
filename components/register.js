import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useAuth } from "../AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const { isLogin, setLogin, setSection } = useAuth();

  useEffect(() => {
    if (isLogin) {
      setSection("Home"); // Navigate to the Home section if already logged in
    }
  }, [isLogin, setSection]);

  const handleSubmit = async () => {
    if (password.length < 10) {
      setMessage("Password must be at least 10 characters long.");
      return;
    }
    if (password !== passwordConfirm) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://172.21.48.189/YY_Music_JS/backend/index.php?action=register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (data.success) {
        Alert.alert("Registration successful, please login");
        setLogin(true);
        setSection("viewSong");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("There was an error during registration:", error.message);
      setMessage("Registration failed due to a network or server issue.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        placeholder="Confirm Password"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {message !== "" && <Text style={styles.message}>{message}</Text>}
      <TouchableOpacity
        onPress={() => {
          setSection("Login"); // Assuming setSection is a method to navigate to different screens
        }}
      >
        <Text style={styles.loginText}>
          Already have an account? Login here!
        </Text>
      </TouchableOpacity>
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
    fontSize: 16,
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
