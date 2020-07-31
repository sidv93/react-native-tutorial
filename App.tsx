import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import ClockValues from './src/ClockValuesAndIdentites';
import { LoadAssets } from "./src/components";
import Transitions from './src/Transitions';
import UseTransition from './src/UseTransition';
import Timing from './src/Timing';

const fonts = {
  "SFProText-Bold": require("./src/assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./src/assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./src/assets/fonts/SF-Pro-Text-Regular.otf"),
};

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <View style={styles.container}>
        {/* <ClockValues /> */}
        {/* <Transitions /> */}
        {/* <UseTransition /> */}
        <Timing />
      </View>
    </LoadAssets>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
