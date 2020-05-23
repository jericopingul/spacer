import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import IdleScreen from './IdleScreen';
import LowRiskScreen from './LowRiskScreen';
import HighRiskScreen from './HighRiskScreen';
import PausedScreen from './PausedScreen';

const Main = () => {
  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title='Spacer' />
      </Appbar.Header>
      {/* <IdleScreen /> */}
      {/* <LowRiskScreen /> */}
      <HighRiskScreen />
      {/* <PausedScreen /> */}
      <FAB
        style={styles.fab}
        icon='pause'
        label='5 mins'
        onPress={() => console.log('Pressed')}
      />
      <Appbar style={styles.bottom}>
        <Appbar.Action
          icon='magnify'
          onPress={() => console.log('Pressed archive')}
        />
      </Appbar>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
  },
  header: {
    // backgroundColor: 'white',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'white',
  },
  fab: {
    backgroundColor: 'white',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 64,
    zIndex: 100,
  },
});
