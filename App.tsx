/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BleManager, Device} from 'react-native-ble-plx';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [myDevice, setMyDevice] = useState<Device | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const manager = new BleManager();

  const UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
  const CHARACTERISTIC = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

  const onPressScanButton = () => {
    setIsScanning(true);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        setIsScanning(false);
        return;
      }
      if (device?.serviceUUIDs![0] === UUID) {
        setMyDevice(device);
        manager.stopDeviceScan();
        manager.connectToDevice(device.id).then(() => {
          setConnected(true);
        });
        setIsScanning(false);
        // device.characteristicsForService(UUID).then(characteristics => {
        //   console.log(characteristics);
        // }).catch((error) => console.log(error))
      }
    });
  };
  
  const onConnect = () => {
    if (myDevice){
      myDevice.characteristicsForService(UUID).then(characteristics => {
        console.log(characteristics);
      }).catch((error) => console.log(error))
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {isScanning && <Text>Scanning</Text>}
        <View>
          <Text style={{alignSelf: 'center'}}>BLE App</Text>
          <TouchableOpacity style={{height: 100, backgroundColor: "blue"}} onPress={onPressScanButton}>
            <Text style={{alignSelf: 'center', color: "white"}} >
              Press to Scan
              </Text>
            </TouchableOpacity>
          <Button onPress={onConnect} title="Conectar" />
          {myDevice && (
            <View>
              <Text style={{alignSelf: 'center'}}>
                My Device: {myDevice.id}
              </Text>
              <Text style={{alignSelf: 'center'}}>
                My Device: {myDevice.name}
              </Text>
              <Text>UUID: {myDevice.serviceUUIDs![0]}</Text>
              {connected ? (
                <Text>Connected!</Text>
              ) : (
                <Text>Not connected!</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
