import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
// import openImagePickerAsync from "./imagePicker";
import Home from "./components/Home";
import { AuthProvider } from "./AuthContext";

// The app component
export default function App() {
  return (
    <AuthProvider>
      <View>
        <Home />
      </View>
    </AuthProvider>
  );
}
