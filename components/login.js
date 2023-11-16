import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from '../AuthContext';

export default function Login() {
    const { username, setUsername, isLogin, setLogin } = useAuth();
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (localUsername === '' || localPassword === '') {
                alert("Please fill in all the blanks");
                return;
            }

            const response = await fetch('http://localhost/YY_Music_JS/backend/index.php?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ localUsername, localPassword })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                setUsername({
                    Name: username});
                setLogin(true);
                // Jumping to the Create song Section
            } else {
                alert("Login failed," + data.message);
            }

        } catch (error) {
            alert("Login failed due to a network or server issue.");
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
    //     isLogin 
    //     ? 
    //         (<div>
    //             <button onClick={() => {window.location.replace('/Createsong')}}>create review</button>
    //             <button onClick={() => {
    //                 sessionStorage.removeItem('isLogin');
    //                 //make sure to remove the username as well
    //                 sessionStorage.removeItem('username');
    //                 window.location.reload();
    //             }}>
    //                 Logout
    //             </button>
    //         </div>)
    //     :   
    //         (<div>
    //             <form onSubmit={handleSubmit}>
    //             <input 
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //                 placeholder="Username" 
    //                 required
    //             />
    //             <input 
    //                 type="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 placeholder="Password" 
    //                 required
    //             />
    //             <button type="submit">Login</button>
    //             <Link to="/register"><button type="button">Register</button></Link>

    //             </form>
    //         </div>)
    // );
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
