import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import Login from './login';
import Logo from './logo';

const TopBar = () => {
    return (
        <View>
            <Text>TopBar</Text>
            <Logo/>
            <Login/>
        </View>
    );
};

export default TopBar;
