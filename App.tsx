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
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BleManager} from 'react-native-ble-plx';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [myDevice, setMyDevice] = useState<null | string>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const manager = new BleManager();

  const UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

  const onPressScanButton = () => {
    setIsScanning(true);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        setIsScanning(false);
        return;
      } else {
        if (device?.id === UUID) {
          setMyDevice(device!.id);
          manager.stopDeviceScan();
          setIsScanning(false);
        }
      }
    });
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
          <Button onPress={onPressScanButton} title="Press to scan" />
          {myDevice && (
            <Text style={{alignSelf: 'center'}}>My Device: {myDevice}</Text>
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
