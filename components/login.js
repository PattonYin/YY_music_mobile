import React from 'react';
import { Text, View, StyleSheet } from "react-native";

function Login() {
    return (
        <View>
            <Text style={styles.login}>Login</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    login: {
        padding: 15,
    },
});

export default Login;
