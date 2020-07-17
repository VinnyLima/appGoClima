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
import React from 'react';
import { View, StyleSheet, Text, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Reload, Cidade, Bairro, DadosEnd, Day, TempWeather, Temp, MinMaxTemp, Min, Max } from './style';

//   console.log(weather.main.temp);
export default function Clima() {
    return (
        <Container>
            <Reload onPress={() => {
                console.log('reload');
            }}>
                <Icon name="refresh-cw" size={30} color="#404040" />
            </Reload>
            <DadosEnd>
                <Cidade>Cariacica</Cidade>
                <Bairro>Porto Novo</Bairro>
                <Day>Sexta-Feira</Day>
            </DadosEnd>
            <TempWeather>
                <Icon name="sun" size={60} color="#404040" />
                <Temp>25°</Temp>
            </TempWeather>
            <MinMaxTemp>
            <Min>26º<Icon name="sunrise" size={20} color="#404040" /></Min>
            <Max>22°<Icon name="sunset" size={20} color="#404040" /></Max>
            </MinMaxTemp>
            


        </Container>
    );
}
