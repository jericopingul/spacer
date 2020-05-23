import React from 'react';
import { View, StyleSheet } from 'react-native';
import Covid19 from '../assets/covid-19.svg';
import { Headline, Subheading } from 'react-native-paper';

const PausedScreen = () => {
  return (
    <View style={styles.screen}>
      <Headline style={styles.headline}>
        Space Out to Stop the Spread of COVID19
      </Headline>
      <Covid19 width={128} height={128} />
      <Subheading style={styles.subHeading}>Scan Paused...</Subheading>
    </View>
  );
};

export default PausedScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFF0',
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
