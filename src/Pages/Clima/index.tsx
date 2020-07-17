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
// import {View, StyleSheet, Text, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Reload, ReloadText} from './style';

//   console.log(weather.main.temp);
export default function Clima() {
  return (
    <Container>
      <Reload>
        <Icon name="rocket" size={30} color="#900" />
        <ReloadText>Atualizar</ReloadText>
      </Reload>
    </Container>
  );
}
