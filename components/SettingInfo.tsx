import React, { useState } from "react";
import { Linking, StyleSheet,TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>------------------------------------------</Text>
         </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center', 
    backgroundColor:"#e8f3ff",
    borderRadius:20,
    padding:7,
  },
  getStartedText: {
    flex: 0.5,
    fontSize: 17,
    fontWeight:"bold",
    lineHeight: 24,
    textAlign: 'center',
  },
  textcolor:{
    color:"white",
  },
});