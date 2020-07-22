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

 /**
  * Importações Globais
  */
import React, {useCallback, useState, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/Feather';
import RNRestart from 'react-native-restart';
import Geolocation from 'react-native-geolocation-service';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

/**Importações Locais */
import apiGeoc from '../../services/apiGeocodig';
import api from '../../services/api';

const apikey = 'd55143bf18a6deb7e90c8f3a26783805';

const apikeyGeocoding = 'AIzaSyD_SyO_idxGehdhhaPfaMr3ByQyVflaVd0';

/**
 * Estilização
 */
import {
  ContainerSun,
  ContainerMoon,
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

interface AddressData{
  cidade: string;
  bairro: string;
}

interface WeatherData{
  temp: number,
  tempMax: number,
  tempMin: number,
}

export default function Clima() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userPosition, setUserPosition] = useState<Coordenadas>(Object);
  const [verifiObject, setVerifiObject] = useState(false);
  const [temp, setTemp] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [address, setAddress] = useState<AddressData>({} as AddressData);
  const [weather, setWeather] = useState<WeatherData>({} as WeatherData);
  const [background, setBackground] = useState('');

  moment.locale('pt-br');
  const today = moment().calendar();
  

  /**Tentativa de mudar a cor do background quando chegasse a noite */
  const hours = moment().format('LT');

  const hadleBackground = useCallback(() => {
    if (hours >= '18:00' && hours <= '5:55') {      
      setBackground('#737373');
    } else if (hours >= '6:00' && hours <= '17:55') {      
      setBackground('#737373');
    }
  }, [hours]);

  /**Verificação se o usurio permitiu que o app acese sua localização  */

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

  /**
   * Aqui obtemos as coordenadas de onde o aparelho se encontra
   * 
   */
  useEffect(() => {
    hadleBackground();
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
  }, [hasLocationPermission, hadleBackground]);

  /**
   * Neste Hook, obtemos as temperaturas em kelvin
   * na exibição e feita a conversão da mesma para Celcius
   * Formula: C = (K - 273.15).
   * 
   * Aqui tambem obtemos o endereço do usuario pela api do
   * Google, a geocodig.
   */

  useEffect(() => {
    try {
      if (userPosition.latitude && userPosition.longitude) {
        async function handleWealther(latitude: number, longitude: number) {
          var response = await api.get(
            `2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`,
          );
          if (response.data) {
            setVerifiObject(true);            
            setWeather({
              temp: response.data.main.temp,
              tempMax: response.data.main.temp_max,
              tempMin: response.data.main.temp_min,
            })
          }
        }
        handleWealther(userPosition.latitude, userPosition.longitude);

        async function handleAndress(latitude: number, longitude: number) {
          var response = await apiGeoc.get(`/json?latlng=${latitude},${longitude}&key=${apikeyGeocoding}
            `);
            setAddress({
              cidade: response.data.results[0].address_components[3].long_name,
              bairro: response.data.results[0].address_components[2].long_name,
            })          
        }
        handleAndress(userPosition.latitude, userPosition.longitude);
      }
    } catch (error) {
      console.log(error.code, error.message);
    }
  }, [userPosition.latitude, userPosition.longitude]);

  return (
    <ContainerSun>
      <Reload
        onPress={() => {
          RNRestart.Restart();
        }}>
        <Icon name="refresh-cw" size={30} color="#404040" />
      </Reload>

      <DadosEnd>
        <ShimmerPlaceHolder
          style={{height: 120, borderRadius: 10}}
          autoRun={true}
          visible={verifiObject}
          colorShimmer={['#ffff4d', '#ffffb3', '#ffff1a']}>
          <Cidade>{address.cidade},</Cidade>
          <Bairro>{address.bairro}</Bairro>
          <Day>{today}</Day>
        </ShimmerPlaceHolder>
      </DadosEnd>

      <TempWeather>
        <ShimmerPlaceHolder
          style={{height: 120, borderRadius: 10}}
          autoRun={true}
          visible={verifiObject}
          colorShimmer={['#ffff4d', '#ffffb3', '#ffff1a']}>
          <Icon name="sun" size={60} color="#404040" />
          <Temp>{(weather.temp - 273.15).toFixed(0)}°</Temp>
        </ShimmerPlaceHolder>
      </TempWeather>
      <ShimmerPlaceHolder
        style={{height: 50, borderRadius: 15, marginTop: 140}}
        autoRun={true}
        visible={verifiObject}
        colorShimmer={['#ffff4d', '#ffffb3', '#ffff1a']}>
        <MinMaxTemp>
          <Max>
            {(weather.tempMax - 273.15).toFixed(0)}°
            <Icon name="sunrise" size={20} color="#404040" />
          </Max>
          <Min>
            {(weather.tempMin - 273.15).toFixed(0)}°
            <Icon name="sunset" size={20} color="#404040" />
          </Min>
        </MinMaxTemp>
      </ShimmerPlaceHolder>
    </ContainerSun>
  );
}

