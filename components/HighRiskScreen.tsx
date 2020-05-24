import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Disease from '../assets/disease.svg';
import { Headline, Subheading } from 'react-native-paper';
import Device from '../classes/device';

const HighRiskScreen = ({ devices }: { devices: Device[] }) => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Headline style={styles.headline}>Bluetooth Devices Detected</Headline>
      <Disease width={128} height={128} />
      <Subheading style={styles.subHeading}>Space Out</Subheading>
      <Subheading>&#x27f5; 2m &#x27f6;</Subheading>
      {devices.length > 0 && (
        <View style={styles.devices}>
          {devices.map((device) => {
            return (
              <Text style={styles.deviceDetails} key={device.id}>{`${
                device.name || device.id
              } - ${device.distance.toFixed(2)} m - ${
                Number(device.timeInDistance) / 1000
              } sec`}</Text>
            );
          })}
        </View>
      )}
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
    marginBottom: 24,
    marginTop: 64,
  },
  subHeading: {
    marginTop: 24,
  },
  devices: {
    marginTop: 24,
    marginLeft: 24,
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  deviceDetails: {
    margin: 8,
  },
});
