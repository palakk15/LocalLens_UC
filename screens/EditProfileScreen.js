import React, { useContext, useState } from "react";
import { View, TextInput, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../UserContext";

export default function EditProfileScreen({ navigation }) 
{
  const { user, updateUser } = useContext(AppContext);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [password, setPassword] = useState(user.password);
  const [contactNumber, setContactNumber] = useState(user.contactNumber);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const saveProfile = () => {
    updateUser({ name, email, profilePic, password,contactNumber });
    navigation.goBack();
  };


  return(
    <View style = {styles.container}>
        {profilePic ? (
            <Image source = {{uri:profilePic}} style = { styles.image } />
        ): (
            <Image
            source={require("../assets/default-avatar.png")}
            style={styles.image}
            />
        )}

        <Button title = "CHANGE PROFILE PICTURE" onPress={pickImage}/>

        <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
        />

        <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        />

        <TextInput
        style={styles.input}
        value={contactNumber}
        onChangeText={setContactNumber}
        placeholder="Enter Contact Number"
        />

        <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Enter Password"
        />

        

        <Button title = "Save" onPress={saveProfile}/>
        
    </View>
  );
}

const styles = StyleSheet.create({
 
    container: { flex: 1, padding: 20, alignItems: "center",backgroundColor:"#eed7d7ff" },
  image: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#050202ff",
    padding: 10,
    width: "90%",
    marginVertical: 10,
    borderRadius: 5,
  },
 
})
