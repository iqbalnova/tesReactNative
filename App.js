import React, {useEffect, useState} from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';

const App = () => {
  const [deviceInfo, setDeviceInfo] = useState({});
  const [persentaseMemori, setPersentaseMemori] = useState();

  // get data model from device
  const getDeviceModel = () => {
    const model = DeviceInfo.getModel();
    const ver = DeviceInfo.getSystemVersion();
    setDeviceInfo({
      name: model,
      version: ver,
    });
  };

  // get data memory from device
  const getDeviceStorage = async () => {
    const storage = await RNFS.getFSInfo();
    const used = storage.totalSpace - storage.freeSpace;
    const persentase = (used / storage.totalSpace) * 100;
    console.log(storage.freeSpace);
    console.log('======');
    setPersentaseMemori(Math.round(persentase));
  };

  useEffect(() => {
    getDeviceModel();
    getDeviceStorage();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Device Info</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.titleText}>{deviceInfo.name}</Text>
        <Text style={styles.dataText}>
          {Platform.OS + ' ' + deviceInfo.version}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.titleText}>Internal Storage</Text>
        <Text style={styles.dataText}>{persentaseMemori + '% used'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 2,
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#c1f9ee',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 50,
    padding: 10,
    borderRadius: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '500',
  },
  dataText: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default App;
