import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { useAuth } from '../AuthContext';
import Logo from './logo';

const TopBar = () => {
    const { username, isLogin } = useAuth();

    return (
        <View style={styles.topbar}>
            <Logo style={styles.logo}/>
            <View style={styles.gap}/> 
            {isLogin ? <Text>Welcome, {username}</Text> : <Text style={styles.login}>Click here to login</Text>}
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
