import React, { useState } from "react";
import { Linking, StyleSheet,TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          ------------------------------------------
        </Text>
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
    flex: 0.8,
    fontSize: 17,
    fontWeight:"bold",
    lineHeight: 24,
    textAlign: 'center',
  },
  fetchButton: {
    alignItems: 'center',
    backgroundColor: '#ffa72b',
    padding: 10,
    marginTop:50,
    borderRadius:10,
  },
  openMapButton: {
    alignItems: 'center',
    backgroundColor: '#ff2b2b',
    color:"white",
    padding: 10,
    margin: 10,
    borderRadius:10,
  },
  textcolor:{
    color:"white",
  },
});