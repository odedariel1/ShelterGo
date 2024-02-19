import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> oded


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
<<<<<<< HEAD
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
=======
      <View style={styles.titleBorder}>
      <Text style={styles.title}>𝓢𝓱𝓮𝓵𝓽𝓮𝓻𝓖𝓸</Text>
      </View>
      <View style={styles.separator}/>
>>>>>>> oded
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
<<<<<<< HEAD
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
=======
    paddingTop:40,
    backgroundColor:"#569de8"
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color:"#e8f3ff",
    padding:10,
  },
  titleBorder:{
    backgroundColor:"#569de8",
    borderRadius: 15,
  },
  separator: {
    marginVertical: 30,
>>>>>>> oded
  },
});
