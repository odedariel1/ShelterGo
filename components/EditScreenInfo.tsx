import React, {useEffect, useState } from "react";
import { Linking, StyleSheet,TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import * as Location from 'expo-location';

export default function EditScreenInfo({ path }: { path: string }) {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {  
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let long = 0.0
  let lat = 0.0
   if (location) {
    long = location.coords.longitude
    lat = location.coords.latitude
  }
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
          rankPreference: "DISTANCE",
          locationBias:{circle:{center:{latitude:lat,longitude:long},radius:5000.0,}},
        }),
      }
    );
    const {places} = await response.json();
    if(Object.keys(places).length===0)
    {
      setErrorMsg("Cannot Find Shelter Around Your Location");
    }
    else
    {
      setHref(places[0].googleMapsUri);
      const supported = await Linking.canOpenURL(href);
      if (supported) {
        await Linking.openURL(href);
      } else {
        console.log(`Don't know how to open this URL: ${href}`);
      }
    }
  };
  return (
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>𝐀𝐥𝐞𝐫𝐭 𝐈𝐧 𝐘𝐨𝐮𝐫 𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧 𝐂𝐥𝐢𝐜𝐤 𝐓𝐨 𝐅𝐢𝐧𝐝 𝐒𝐡𝐞𝐥𝐭𝐞𝐫</Text>
      <TouchableOpacity style={styles.openMapButton} onPress={fetchApi}>
        <Text style={styles.textcolor}>Navigate</Text>
      </TouchableOpacity>
      <Text>{errorMsg}</Text>
         </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center', 
    backgroundColor:"#e8f3ff",
    borderRadius:20,
    padding:4
  },
  getStartedText: {
    padding: 13,
    fontSize: 15,
    fontWeight:"bold",
    lineHeight: 24,
    textAlign: 'center',
    color:"red",
    flex: 0.4,
    marginTop:10

  },
  openMapButton: {
    alignItems: 'center',
    backgroundColor: '#ff2b2b',
    color:"white",
    padding: 10,
    margin: 10,
    borderRadius:18,
  },
  textcolor:{
    fontSize:20,
    color:"white",
  },
});