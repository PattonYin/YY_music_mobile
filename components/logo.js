import React from 'react';
import { Text, View, StyleSheet } from "react-native";

function Logo() {
    return (
        <View>
            <Text style={styles.logo}>Logo</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        padding: 15,
    },
});

export default Logo;
