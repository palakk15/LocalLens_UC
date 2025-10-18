import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { AppContext } from "./UserContext";

export default function ProfileScreen({ navigation })
{ 
    const { user }= useContext(AppContext);
    return(
        <View style={style.container}>
      {user.profilePic ? (
        <Image source={{ uri: user.profilePic }} style={style.image} />
      ) : (
        <Image
          source={require("../assets/image.png")}
          style={style.image}
        />
            )}
             <Text style={style.name}>{user.name}</Text>
             <Text style={style.email}>{user.email}</Text>
            <Button title="Edit Profile" onPress={() => navigation.navigate("Edit Profile")} />
        </View>
    );
  
}

const style=StyleSheet.create({
    container: {flex:1, justifyContent:"center", alignItems:"center",color:"#535151ff",},
    image: {width:120, height:120, borderRadius:60, marginBottom:20},
    name: {fontSize:20, fontWeight:"bold", color:"#535151ff"},
    email: {fontSize: 18, fontWeight:"bold", color: "#535151ff"},
    contactNumber: {fontSize: 18, fontWeight:"bold",color: "#535151ff"},
    password: {fontSize: 18, fontWeight:"bold", color:"#535151ff"},
    
});