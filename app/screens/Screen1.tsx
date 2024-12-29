import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Screen1 = () => (
  <View style={styles.screen}>
    <Text>Screen 1</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Screen1;
