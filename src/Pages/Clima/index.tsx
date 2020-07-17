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

import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, Text, PermissionsAndroid } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Reload, Cidade, Bairro, DadosEnd, Day, TempWeather, Temp, MinMaxTemp, Min, Max } from './style';
import Geolocation from 'react-native-geolocation-service';
import api from '../../services/api';



const apikey = 'd55143bf18a6deb7e90c8f3a26783805';

interface Coordenadas {
    latitude: number;
    longitude: number;
}

// interface WeatherObject {
//     description: string;
//     icon: string;
//     id: number;
//     main: string;
//   }
  
//   interface Response {
//       name: string
//     main: {
//       feels_like: number;
//       humidity: number;
//       pressure: number;
//       temp: number;
//       temp_max: number;
//       temp_min: number;
//     };
//     weather: WeatherObject[];
//   }

//   console.log(weather.main.temp);
export default function Clima() {
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [userPosition, setUserPosition] = useState<Coordenadas>(Object);
    const [coords, setCoords] = useState({});
    const [weather, setWeather] = useState<Response>({}as Response);

    const today = moment().format('dddd');



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
                        console.log(error.code, error.message);
                    },
                );
                if (userPosition.latitude != null) {
                    await api.get(`2.5/weather?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${apikey}`).then((response) => {
                        setWeather(response.data);

                    })
                }


            }
        }
        handleLocation();
    }, [hasLocationPermission]);

    console.log(userPosition.latitude, userPosition.longitude);
    console.log(weather);


    return (
        <Container>
            <Reload onPress={() => {
                console.log('reload')

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
                <Max>{(weather.main.temp_max - 273.15).toFixed(0)}°<Icon name="sunrise" size={20} color="#404040" /></Max>
                <Min>{(weather.main.temp_min - 273.15).toFixed(0)}º<Icon name="sunset" size={20} color="#404040" /></Min>
            </MinMaxTemp>
        </Container>
    );
}
