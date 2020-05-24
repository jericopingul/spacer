import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import IdleScreen from './IdleScreen';
import LowRiskScreen from './LowRiskScreen';
import HighRiskScreen from './HighRiskScreen';
import PausedScreen from './PausedScreen';

import {
  BleManager,
  BleError,
  Device as BleDevice,
  LogLevel,
} from 'react-native-ble-plx';
import Device from '../classes/device';

const manager = new BleManager();

const MONITOR_INTERVAL = 3000; // 3 sec
const DISTANCE = 2; // 2 m
const PAUSE_TIME = 5000; // 5 sec

const Main = () => {
  const [devices, setDevices]: [{ [key: string]: Device }, Function] = useState(
    {}
  );
  const [devicesInDistance, setDevicesInDistance]: [
    Device[],
    Function
  ] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseTimeoutId, setPauseTimeoutId]: [number, Function] = useState(0);
  const [monitorIntervalId, setMonitorIntervalId]: [
    number,
    Function
  ] = useState(0);

  const handleScan = (error: BleError | null, device: BleDevice | null) => {
    if (error || !device) {
      return;
    }
    const foundDevice = devices[device.id];

    if (foundDevice) {
      foundDevice.addRssi(device.rssi);
      foundDevice.txPowerLevel = device.txPowerLevel;
      foundDevice.manufacturerData = device.manufacturerData;
      return;
    }
    setDevices({
      ...devices,
      ...{ [device.id]: new Device(device) },
    });
  };

  const startMonitoringDevices = () => {
    setMonitorIntervalId(
      setInterval(() => {
        const newDevicesInDistance = Object.keys(devices)
          .filter((key) => devices[key].distance < DISTANCE)
          .map((key) => devices[key]);

        const updated = newDevicesInDistance.map((newDevice) => {
          const found = !!devicesInDistance.find(
            (previous) => previous.id === newDevice.id
          );
          if (!found) {
            newDevice.timeInDistance = MONITOR_INTERVAL;
            return newDevice;
          }
          newDevice.timeInDistance = newDevice.timeInDistance
            ? (newDevice.timeInDistance += MONITOR_INTERVAL)
            : MONITOR_INTERVAL;
          return newDevice;
        });

        setDevicesInDistance(updated);
      }, MONITOR_INTERVAL)
    );
  };

  const startScan = () => {
    clearTimeout(pauseTimeoutId);
    setIsScanning(true);
    setIsPaused(false);
    manager.startDeviceScan(null, { allowDuplicates: true }, handleScan);
    startMonitoringDevices();
  };

  const stopScan = () => {
    clearInterval(monitorIntervalId);
    setIsPaused(false);
    setIsScanning(false);
    manager.stopDeviceScan();
  };

  const onPause = () => {
    stopScan();
    setIsPaused(true);
    setPauseTimeoutId(setTimeout(() => startScan(), PAUSE_TIME));
  };

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title='Spacer' />
      </Appbar.Header>

      {(() => {
        if (isPaused) {
          return <PausedScreen />;
        }
        if (!isScanning) {
          return <IdleScreen onImgPress={startScan} />;
        }
        if (!devicesInDistance.length) {
          return <LowRiskScreen />;
        }
        return <HighRiskScreen devices={devicesInDistance} />;
      })()}
      {isScanning && (
        <FAB
          style={styles.fab}
          icon='pause'
          label='5 mins'
          onPress={() => onPause()}
        />
      )}
      <Appbar style={styles.bottom}>
        {isScanning && !isPaused ? (
          <Appbar.Action icon='stop' onPress={stopScan} />
        ) : (
          <Appbar.Action icon='magnify' onPress={startScan} />
        )}
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
    backgroundColor: 'white',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
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
