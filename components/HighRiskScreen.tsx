import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Disease from '../assets/disease.svg';
import { Headline, Subheading } from 'react-native-paper';

const HighRiskScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Headline style={styles.headline}>Bluetooh Devices Detected</Headline>
      <Disease width={128} height={128} />
      <Subheading style={styles.subHeading}>Space Out</Subheading>
      <Subheading>&#x27f5; 2m &#x27f6;</Subheading>
    </ScrollView>
  );
};

export default HighRiskScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FED7D7',
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
