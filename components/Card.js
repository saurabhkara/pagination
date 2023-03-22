import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Card({ item }) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('article',{item:item})}>
      <Text numberOfLines={2} style={{ marginVertical: 5 }}>
        Title:
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.title}</Text>
      </Text>
      <Text style={{ marginVertical: 5 }}>
        Author :{" "}
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.author}</Text>
      </Text>
      <Text numberOfLines={1}>
        createAt :<Text>{item.created_at.slice(0,12)}</Text>
      </Text>
      <Text numberOfLines={2}>
        Story :<Text>{item?.story_text?.value}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    margin: 10,
    width: 250,
    padding: 20,
    backgroundColor: "#bdfffb",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
});
