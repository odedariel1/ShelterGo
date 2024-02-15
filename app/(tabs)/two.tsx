import { StyleSheet } from 'react-native';

import SettingInfo from '@/components/SettingInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleBorder}>
      <Text style={styles.title}>𝓢𝓮𝓽𝓽𝓲𝓷𝓰𝓼</Text>
      </View>
      <View style={styles.separator} />
      <SettingInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop:40,
    backgroundColor:"#569de8",
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
