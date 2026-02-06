import React , {useState} from "react";
import { View, TextInput, Button, Alert } from "react-native";
import api from "../api/api";



export default function RegisterScreen({navigation}){
    const [username, setUsername]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

;

const registerUser = async () => {
    try{
        const res = await api.post("/register",{
            username,
            email,
            password,
        });
        Alert.alert("Success", "User registered successfully");
    } catch(error) {
        Alert.alert("Error", error.response?.data?.message || "Registration failed")
    }
};

return(
    <View>
        <TextInput placeholder="Username" onChangeText={setUsername}/>
        <TextInput placeholder="Email" onChangeText={setEmail}/>
        <TextInput placeholder="Password"  secureTextEntry onChangeText={setPassword}/>
        <Button title="Register" onPress={registerUser}/>

    </View>
);
}