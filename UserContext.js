import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    profilePic: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) setIsLoggedIn(true);

        const storedUser = await AsyncStorage.getItem("userData");
        if (storedUser) setUser(JSON.parse(storedUser));

        const storedFavs = await AsyncStorage.getItem("favouritesData");
        if (storedFavs) setFavourites(JSON.parse(storedFavs));
      } catch (err) {
        console.log("Error loading data", err);
      }
    };
    loadData();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const updateUser = async (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    await AsyncStorage.setItem("userData", JSON.stringify(newUser));
  };

  const addFavourite = async (event) => {
    const exists = favourites.some((e) => e.id === event.id);
    if (exists) return;
    const newFavs = [event, ...favourites];
    setFavourites(newFavs);
    await AsyncStorage.setItem("favouritesData", JSON.stringify(newFavs));
  };

  const removeFavourite = async (eventId) => {
    const newFavs = favourites.filter((e) => e.id !== eventId);
    setFavourites(newFavs);
    await AsyncStorage.setItem("favouritesData", JSON.stringify(newFavs));
  };

  const toggleFavourite = (event) => {
    const exists = favourites.some((e) => e.id === event.id);
    exists ? removeFavourite(event.id) : addFavourite(event);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        updateUser,
        favourites,
        addFavourite,
        removeFavourite,
        toggleFavourite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
