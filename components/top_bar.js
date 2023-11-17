import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from '../AuthContext';
import Logo from './logo';

const TopBar = () => {
    const { username, isLogin, setSection } = useAuth();

    return (
        <View style={styles.topbar}>
            <Logo style={styles.logo}/>
            <View style={styles.gap}/> 
            {isLogin ? 
                <Text style={styles.login}>Welcome, {username}</Text> 
                : 
                <TouchableOpacity style={styles.button} onPress={() => {setSection('Register')}}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>}
        </View>
    );
};

const styles = StyleSheet.create({
    topbar: {
        flexDirection: "row",
    },
    logo: {
        flex: 1,
    },
    gap: {
        flex: 3,
    },
    login: {
        flex: 1,
    },
    button: {
        flex: 1,
        backgroundColor: "#4a90e2",
        paddingHorizontal: 2,
        borderRadius: 2,
      },
    buttonText: {
        color: "#fff",
        fontSize: 10,
    },
});

export default TopBar;
