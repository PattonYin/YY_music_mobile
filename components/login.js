import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from '../AuthContext';

export default function Login() {
    const { setUsername, setLogin, setSection } = useAuth();
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (localUsername === '' || localPassword === '') {
                alert("Please fill in all the blanks");
                return;
            }

            const response = await fetch('http://172.21.48.189/YY_Music_JS/backend/index.php?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'username': localUsername, 'password': localPassword })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                setUsername(localUsername);
                setLogin(true);
                setSection("Create Review");
                alert("login success");
            } else {
                alert("Login failed," + data.message);
            }

        } catch (error) {
            alert("Login failed due to a network or server issue.", error);
        }
    };

    return (
        <View>
            <Text>Login</Text>
            <Text>Username:</Text>
            <TextInput
                value={localUsername}
                placeholder="username"
                onChangeText={setLocalUsername}
            />
            <Text>Password:</Text>
            <TextInput
                value={localPassword}
                placeholder="password"
                onChangeText={setLocalPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "left",
        justifyContent: "left",
        paddingBottom: 20,
        paddingTop: 20,
    },
    button: {
        backgroundColor: "#4a90e2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
      },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});
