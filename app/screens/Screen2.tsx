import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Screen2 = () => (
  <View style={styles.screen}>
    <Text>Screen 2</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Screen2;
