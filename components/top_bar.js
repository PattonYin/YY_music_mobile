import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import Login from './login';
import Logo from './logo';

const TopBar = () => {
    return (
        <View style={styles.topbar}>
            <Logo style={styles.logo}/>
            <View style={styles.gap}/> 
            <Login style={styles.login}/>
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
        flex: 1,
    },
    login: {
        flex: 1,
    },
});

export default TopBar;
