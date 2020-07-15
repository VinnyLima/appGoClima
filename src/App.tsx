import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, PermissionsAndroid} from 'react-native';
import Geolocation2 from '@react-native-community/geolocation';

import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  text: {
    color: 'orange',
    fontSize: 40,
  },
});

export default function App() {
  // const [hasLocationPermission, setHasLocationPermission] = useState(false);
  // const [userPosition, setUserPosition] = useState(false);
  const [coords, setCoords] = useState({});

  Geolocation2.getCurrentPosition((info) => console.log(info));

  // async function verifyLocationPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('permissão concedida');
  //       setHasLocationPermission(true);
  //     } else {
  //       console.error('permissão negada');
  //       setHasLocationPermission(false);
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  // useEffect(() => {
  //   verifyLocationPermission();

  //   if (hasLocationPermission) {
  //     Geolocation.getCurrentPosition(
  //       (position) => {
  //         setUserPosition({
  //           latitude: position.coords.latitude,info => console.log(info)
  //         });
  //       },
  //       (error) => {
  //         console.log(error.code, error.message);
  //       },
  //     );
  //   }
  // }, [hasLocationPermission]);

  return (
    <View style={styles.container}>
      <Text>Infos: </Text>
    </View>
  );
}
