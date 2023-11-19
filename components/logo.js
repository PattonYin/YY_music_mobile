import React from "react";
import { Text, View, StyleSheet } from "react-native";
//The setcion for the graph logo
function Logo() {
  return (
    <View>
      <Text style={styles.logo}>Graph</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    padding: 5,
  },
});

export default Logo;
