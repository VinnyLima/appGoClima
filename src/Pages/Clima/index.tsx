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

import React, {useCallback, useState, useEffect} from 'react';
import {PermissionsAndroid, View, Text} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Reload,
  Cidade,
  Bairro,
  DadosEnd,
  Day,
  TempWeather,
  Temp,
  MinMaxTemp,
  Min,
  Max,
} from './style';
import Geolocation from 'react-native-geolocation-service';
import api from '../../services/api';
import RNRestart from 'react-native-restart';

const apikey = 'd55143bf18a6deb7e90c8f3a26783805';

interface Coordenadas {
  latitude: number;
  longitude: number;
}

interface Response {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
}

//   console.log(weather.main.temp);
export default function Clima() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [weather, setWeather] = useState<Response>(Object);
  const [userPosition, setUserPosition] = useState<Coordenadas>(Object);
  const [verifiObject, setVerifiObject] = useState(false);

  moment.locale('pt-br');
  const today = moment().calendar();

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
          (position) => {
            console.log(position);
            setUserPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    }

    handleLocation();
  }, [hasLocationPermission]);

  useEffect(() => {
    try {
      if (userPosition.latitude && userPosition.longitude) {
        async function handleWealther(latitude, longitude) {
          var response = await api.get(
            `2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`,
          );
          if (response.data) {
            setVerifiObject(true);
            setWeather(response.data);
          }
        }
        handleWealther(userPosition.latitude, userPosition.longitude);
      }
    } catch (error) {
      console.log(error.code, error.message);
    }
  }, [userPosition.latitude, userPosition.longitude]);

  console.log(verifiObject);

  if (verifiObject === false) {
    return (
      <Container>
        <View>
          <Text>Carregando</Text>
        </View>
      </Container>
    );
  } else {
    return (
      <Container>
        <Reload
          onPress={() => {
            RNRestart.Restart();
          }}>
          <Icon name="refresh-cw" size={30} color="#404040" />
        </Reload>
        <DadosEnd>
          <Cidade>{weather.name}</Cidade>
          <Bairro>Porto Novo</Bairro>
          <Day>{today}</Day>
        </DadosEnd>
        <TempWeather>
          <Icon name="sun" size={60} color="#404040" />
          <Temp>{(weather.main.temp - 273.15).toFixed(0)}°</Temp>
        </TempWeather>
        <MinMaxTemp>
          <Max>
            {(weather.main.temp_max - 273.15).toFixed(0)}°
            <Icon name="sunrise" size={20} color="#404040" />
          </Max>

          <Min>
            {(weather.main.temp_min - 273.15).toFixed(0)}°
            <Icon name="sunset" size={20} color="#404040" />
          </Min>
        </MinMaxTemp>
      </Container>
    );
  }
}
