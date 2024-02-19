import React, {useEffect, useState } from "react";
import { Linking, StyleSheet,TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

export default function EditScreenInfo({ path }: { path: string }) {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [City, setCity] = useState("");
  const [CatchAlert,setCatchAlert] = useState(false);

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
//-------------------------------------------------Expo Notifications---------------
  useEffect(() => {
    // Request permissions for notifications
    const registerForPushNotificationsAsync = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('Permission to receive notifications was denied!');
          return;
        }
      }
    };

    registerForPushNotificationsAsync();
  }, []);
  useEffect(() => {
    const sendLocalNotification = async () => {
      // Build the notification
      const notificationContent = {
        title: 'Shelter Go',
        body: 'Navigate To Shelter!',
      };

      // Send the notification immediately
      await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger: null, // Set trigger to null for an immediate notification
      });
    };

    sendLocalNotification();
  }, []);
  //-----------------------------------------------------------------------------------
  let long = 0.0
  let lat = 0.0
   if (location) {
    long = location.coords.longitude
    lat = location.coords.latitude
    }
    const getCityFromCoordinates = async (latitude, longitude) => {
      try {
        // Use reverseGeocodeAsync to get address components
        let addressArray = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        // Extract city information from the address components
        const city = addressArray[0]?.city || 'City not found';
        setCity(city);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    useEffect(() => {
      if (location) {
        getCityFromCoordinates(lat, long);
      }
    }, [location]);

  const [href, setHref] = useState("");
  const fetchGoggleMapApi = async () => {
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
          textQuery: "מקלט",
          rankPreference: "DISTANCE",
          locationBias:{circle:{center:{latitude:lat,longitude:long},radius:1000.0,}},
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
  //---------------------------------------------------------------------------------
  const makeAlertFalse = () => {
    setCatchAlert(false)
  };
   //-----------------------Get Alerts From Tzeva Adom-------------------------------
   const checkResponse = () => {
     if (!CatchAlert) {
       fetch("https://api.tzevaadom.co.il/notifications")
       .then(response => {
         // Check if the request was successful (status code 200)
         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          // Parse the JSON response
          return response.json();
        })
        .then(notifications => {
          // Process the notifications
          notifications.forEach(notification => {
        if(notification.cities.Includes(City))// check if the city name inside the alert city name
        {
          setCatchAlert(true)
          fetchGoggleMapApi;
          setTimeout(makeAlertFalse, 30000);//30 seconds until return the notifictions in your area
        }
      });
    });
  }
};
const intervalId = setInterval(checkResponse, 1000);//------Check For New Alerts Every
//-----------------------------------------------------------------------
  return (
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>𝐀𝐥𝐞𝐫𝐭 𝐈𝐧 𝐘𝐨𝐮𝐫 𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧 𝐂𝐥𝐢𝐜𝐤 𝐓𝐨 𝐅𝐢𝐧𝐝 𝐒𝐡𝐞𝐥𝐭𝐞𝐫</Text>
      <TouchableOpacity style={styles.openMapButton} onPress={fetchGoggleMapApi}>
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