import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppProvider } from "./UserContext";
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import HomeScreen from "./screens/HomeScreen";

const Tab=createBottomTabNavigator();

export default function App()
{
  return(
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown : true,
            tabBarIcon:({focused,size}) => {
              let iconName = "";

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Favourites") {
                iconName = focused ? "heart" : "heart-outline";
              } else if (route.name === "Edit Profile") {
                iconName = focused ? "create" : "create-outline";
              }

              return <Ionicons name={iconName} size={size} color={focused ? "#e0245e" : "gray"} />;
            },

             tabBarActiveTintColor: "#e0245e",
            tabBarInactiveTintColor: "gray",
          })}
          >
          <Tab.Screen name="Home" component={HomeScreen}/>
          <Tab.Screen name="Profile" component={ProfileScreen}/>
          <Tab.Screen name="Edit Profile" component={EditProfileScreen}/>
          <Tab.Screen name="Favourites" component={FavouritesScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );

}