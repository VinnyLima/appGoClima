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
import RNRestart from 'react-native-restart';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

/**Importações Locais */
import apiGeoc from '../../services/apiGeocodig';
import api from '../../services/api';

const apikey = 'd55143bf18a6deb7e90c8f3a26783805';
const apikeyGeocoding = 'AIzaSyD_SyO_idxGehdhhaPfaMr3ByQyVflaVd0';

/**
 * Estilização
 */
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

interface DataGeocoding {
  plus_code: {
    compound_code: string;
    global_code: string;
  };
}



//   console.log(weather.main.temp);
export default function Clima() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userPosition, setUserPosition] = useState<Coordenadas>(Object);
  const [verifiObject, setVerifiObject] = useState(false);
  const [weather, setWeather] = useState<Response>(Object);
  const [address, setAddress] = useState<DataGeocoding>(Object);
  const [temp, setTemp] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');

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
        async function handleWealther(latitude: number, longitude: number) {
          var response = await api.get(
            `2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`,
          );
          if (response.data) {                      
            setVerifiObject(true);
            setTemp(response.data.main.temp);
            setTempMax(response.data.main.temp_max)
            setTempMin(response.data.main.temp_min)
          }
        }
        handleWealther(userPosition.latitude, userPosition.longitude);

        async function handleAndress(latitude: number, longitude: number) {
          var response = await apiGeoc.get(`/json?latlng=${latitude},${longitude}&key=${apikeyGeocoding}
            `);
            
            setBairro(response.data.results[0].address_components[2].long_name);
            setCidade(response.data.results[0].address_components[3].long_name)
            
          //setAddress(response.data.results);
        }
        handleAndress(userPosition.latitude, userPosition.longitude);
      }
    } catch (error) {
      console.log(error.code, error.message);
    }
  }, [userPosition.latitude, userPosition.longitude]);

  

  if (verifiObject === false) {
    return (
      <Container>
        <View>
          <Text>Carregando...</Text>
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
        <Cidade>{cidade}</Cidade>
        <Bairro>{bairro}</Bairro>
          <Day>{today}</Day>
        </DadosEnd>
        <TempWeather>
          <Icon name="sun" size={60} color="#404040" />
          <Temp>{(temp - 273.15).toFixed(0)}°</Temp>
        </TempWeather>
        <MinMaxTemp>
          <Max>
            {(tempMax - 273.15).toFixed(0)}°
            <Icon name="sunrise" size={20} color="#404040" />
          </Max>

          <Min>
            {(tempMin - 273.15).toFixed(0)}°
            <Icon name="sunset" size={20} color="#404040" />
          </Min>
        </MinMaxTemp>
      </Container>
    );
  }
}
