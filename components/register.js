import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Register() {

    const styles = StyleSheet.create({
        button: {
            flex: 1,
            backgroundColor: "#4a90e2",
            paddingHorizontal: 10,
            borderRadius: 10,
          },
        buttonText: {
            color: "#fff",
            fontSize: 10,
        },
    });

    return (
        <View>
            <Text>Already have an account? Click here to login!</Text>
            <TouchableOpacity style={styles.button} onPress={() => {setSection('Login')}}>
                <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>
        </View>
    );
}