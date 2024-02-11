import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React from "react";


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleBorder}>
      <Text style={styles.title}>ShelterGo</Text>
      </View>
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
    paddingTop:40,
    backgroundColor:"#569de8"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color:"#569de8",
    padding:10,
  },
  titleBorder:{
    backgroundColor:"#e8f3ff",
    borderRadius: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
