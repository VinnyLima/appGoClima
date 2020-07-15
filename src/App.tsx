/**
 * Desenvolva um aplicativo que consuma a localização atual do usuário e exiba na interface o endereço atual os dados climáticos da região e um botão para atualizar os dados.

    Para fazer essa busca, pode-se usar a API do Open Weather Map: http://api.openweathermap.org/

📌 CONDIÇÕES

    Utilizar React Native
    É permitido o uso de qualquer biblioteca

🙌 DIFERENCIAIS

Será muito bem valorizado:

    Arquitetura
    Documentação
    Interface

 */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, PermissionsAndroid } from 'react-native';
import Geolocation2 from '@react-native-community/geolocation';

// Geolocation2.setRNConfiguration();
//Geolocalização2.setRNConfiguration ( config ) ;

import Geolocation from 'react-native-geolocation-service';
import api from './services/api';

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

const apikey = 'd55143bf18a6deb7e90c8f3a26783805';

interface Coordenadas {
  latitude: number,
  longitude: number,
}

export default function App() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userPosition, setUserPosition] = useState<Coordenadas>(Object);
  const [coords, setCoords] = useState({});
  const [weather, setWeather] = useState({});


  //Geolocation2.getCurrentPosition((info) => console.log(info));

  async function verifyLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permissão concedida');
        setHasLocationPermission(true);
      } else {
        console.error('permissão negada');
        setHasLocationPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    verifyLocationPermission();
    async function handleLocation() {
      if (hasLocationPermission) {
        await Geolocation.getCurrentPosition(
          position => {
            setUserPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            console.log(error.code, error.message);
          }
        );
      }
    }
    handleLocation();

  }, [hasLocationPermission]);



  const { latitude, longitude } = userPosition;

  const caminho = `2.5/weather?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${apikey}`
 

  useEffect(() => {
    async function handleClima(): Promise<void> {
      try {
        await api.get(caminho).then((response) => {
          setWeather(response.data);
          console.log(response.data);

        });
      } catch (err) {
        console.error(err,);

      }

    }
    handleClima();

  }, []);


  return (
    <View style={styles.container}>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
    </View>
  );
}
