import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
// import openImagePickerAsync from "./imagePicker";
import { styles } from "./styles";
import Home from "./components/Home";
import { AuthProvider } from "./AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Home />
      </View>
    </AuthProvider>
  );
}