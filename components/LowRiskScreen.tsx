import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Clipboard from '../assets/clipboard.svg';
import { Headline, Subheading } from 'react-native-paper';

const LowRiskScreen = () => {
  return (
    <View style={styles.screen}>
      <Headline style={styles.headline}>No Bluetooth Devices Detected</Headline>
      <Clipboard width={128} height={128} />
      <Subheading style={styles.subHeading}>
        Maintain a Safe Spaced Distance
      </Subheading>
      <Subheading>&#x27f5; 2m &#x27f6;</Subheading>
    </View>
  );
};

export default LowRiskScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F0FFF4',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headline: {
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 80,
  },
  subHeading: {
    marginTop: 40,
  },
});
