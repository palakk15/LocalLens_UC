import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { AppContext } from "./UserContext";
import { Ionicons } from '@expo/vector-icons';

const API_URL = "https://68ce624a6dc3f350777ed8ae.mockapi.io/api/events";

export default function HomeScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favourites, toggleFavourite } = useContext(AppContext);
  

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        if (isMounted) {
          setEvents(res.data);
          setError(null);
        }
      } catch (err) {
        console.log("Error fetching events:", err);
        if (isMounted) setError("Failed to load events. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  const renderItem = ({ item }) => {
    const isFav = favourites.some((e) => e.id === item.id);

  return(
    <View style={styles.card}>
        <Image
        source={{ uri: item.poster || item.image || " "}}
        style={styles.poster}
        />
        <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.date} • {item.location}</Text>

            <TouchableOpacity onPress={()=>toggleFavourite(item)}>
                <Ionicons
                name={isFav ? "heart" : "heart-outline"}
                size={28}
                style={{ marginTop: 6 }}
                color={isFav ? "#e0245e" : "#333"}
                />
            </TouchableOpacity>
        </View>
    </View>
  );
};

if(loading){
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
            <Text style={{ marginTop: 8 , justifyContent: center}}>Loading events...</Text>
        </View>

    );
}

 if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            setError(null);
            axios
              .get(API_URL)
              .then((res) => setEvents(res.data))
              .catch(() => setError("Failed to load events."))
              .finally(() => setLoading(false));
          }}
        >
          <Text style={{ color: "blue" }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#704444ff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  poster: {
    width: 90,
    height: 90,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: "#ddd",
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "bold" },
  meta: { fontSize: 13, color: "gray", marginTop: 4 },
});