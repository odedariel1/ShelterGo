import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from './Themed';

import Colors from '@/constants/Colors';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Alert In Your Location Click To Find Shelter
        </Text>
        <Button title="Click Here" color="#FF0000"/>     
         </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },

});
