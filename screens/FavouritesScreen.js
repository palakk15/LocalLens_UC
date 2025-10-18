import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { AppContext } from "./UserContext";
import { Ionicons } from '@expo/vector-icons';

export default function FavouritesScreen() {
    const{favourites,removeFavourites} = useContext(AppContext);
    if(!favourites || favourites.length==0){
        return(
            <View style={styles.container}>
                <Text>  No favourites yet!</Text>
            </View>

        );
    }
const renderItem = ({item})=>(
    <View style={styles.card}>
        <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
                {item.date}.{item.location}
            </Text>
            <TouchableOpacity onPress={()=> removeFavourites(item.id)}>
                <Ionicons name="heart-dislike" size={26} color="#e0245e" />
            </TouchableOpacity>
        </View>
    </View>
);

 return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaView>
  );
}

  const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  poster: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "bold" },
  meta: { fontSize: 13, color: "gray", marginTop: 4 },
});
