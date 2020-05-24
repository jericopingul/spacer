import React from 'react';
import { View, StyleSheet } from 'react-native';
import Crowded from '../assets/crowded.svg';
import { Headline, Subheading, Surface } from 'react-native-paper';

const IdleScreen = ({ onImgPress }: { onImgPress: Function }) => {
  return (
    <View style={styles.screen}>
      <Headline style={styles.headline}>
        Space Out to Stop the Spread of COVID19
      </Headline>
      <Surface style={styles.surface}>
        <Crowded width={128} height={128} onPress={() => onImgPress()} />
      </Surface>
      <Subheading style={styles.subHeading}>Scan for nearby devices</Subheading>
    </View>
  );
};

export default IdleScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFF0',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headline: {
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 80,
  },
  surface: {
    backgroundColor: '#FFFFF0',
    height: 192,
    width: 192,
    borderRadius: 96,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  subHeading: {
    marginTop: 40,
  },
});
