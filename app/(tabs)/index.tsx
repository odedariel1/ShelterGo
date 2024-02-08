import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";


export default function TabOneScreen() {
  const [href, setHref] = useState("");
  const fetchApi = async () => {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-FieldMask": "*",
          "X-Goog-Api-Key": `${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`
        },
        body: JSON.stringify({
          textQuery: "bomb shelter around me",
        }),
      }
    );
    const {places} = await response.json();
    setHref(places[0].googleMapsUri);
  };
  const openURL = async (url : string) => {
    const supported = await Linking.canOpenURL(url);
  
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <TouchableOpacity onPress={fetchApi}>
        <Text>Fetch</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openURL(href)}>
        <Text>Open</Text>
      </TouchableOpacity>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
