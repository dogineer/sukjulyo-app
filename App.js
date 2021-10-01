import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import LoginScreen from './src/components/LoginScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Kakao Test</Text>

      <LoginScreen />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
