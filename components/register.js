import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from '../AuthContext';

export default function Register() {
    
    const { setSection } = useAuth();

    const styles = StyleSheet.create({
        button: {
            flex: 1,
            backgroundColor: "#4a90e2",
            paddingHorizontal: 10,
            borderRadius: 10,
          },
        buttonText: {
            color: "#fff",
            fontSize: 20,
        },
    });

    return (
        <View>
            <Text>Already have an account? Click here to login!</Text>
            <View>
                <Text style={styles.buttonText} onPress={() => {setSection('Login')}}> Login </Text>
            </View>
        </View>
    );
}