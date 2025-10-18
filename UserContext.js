import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const UserProvider = ({ children }) => {
  const[favourites, setFavourites] = useState([]);
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    profilePic: null,
    password: "enter your password",
    contactNumber: null,
  });

  
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userData");
        if (storedUser) setUser(JSON.parse(storedUser));

        const storedFavs = await AsyncStorage.getItem("favouritesData");
        if (storedFavs) setFavourites(JSON.parse(storedFavs));
      } catch (err) {
        console.log("Error loading from AsyncStorage", err);
      }
    };
    loadData();
  }, []);

  
  const updateUser = async (updatedData) => {
    try {
      const newUser = { ...user, ...updatedData };
      setUser(newUser);
      await AsyncStorage.setItem("userData", JSON.stringify(newUser));
    } catch (err) {
      console.log("Error saving user", err);
    }
  };

  
  const addFavourite = async (event) => {
    try {
      const exists = favourites.some((e) => e.id === event.id);
      if (exists) return;
      const newFavs = [event, ...favourites];
      setFavourites(newFavs);
      await AsyncStorage.setItem("favouritesData", JSON.stringify(newFavs));
    } catch (err) {
      console.log("Error adding favourite", err);
    }
  };


  const removeFavourite = async (eventId) => {
    try {
      const newFavs = favourites.filter((e) => e.id !== eventId);
      setFavourites(newFavs);
      await AsyncStorage.setItem("favouritesData", JSON.stringify(newFavs));
    } catch (err) {
      console.log("Error removing favourite", err);
    }
  };

  
  const toggleFavourite = (event) => {
    const exists = favourites.some((e) => e.id === event.id);
    if (exists) removeFavourite(event.id);
    else addFavourite(event);
  };

  
  const clearAll = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("favouritesData");
      setUser({ name: "Guest User", email: "guest@example.com", profilePic: null });
      setFavourites([]);
    } catch (err) {
      console.log("Error clearing data", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        favourites,
        addFavourite,
        removeFavourite,
        toggleFavourite,
        clearAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
