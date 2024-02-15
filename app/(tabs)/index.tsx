import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React from "react";


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleBorder}>
      <Text style={styles.title}>𝓢𝓱𝓮𝓵𝓽𝓮𝓻𝓖𝓸</Text>
      </View>
      <View style={styles.separator}/>
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
  },
});
