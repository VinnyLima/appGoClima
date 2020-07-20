import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #ffff4d;
`;

export const Reload = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  top: 15px;
`;

export const DadosEnd = styled.View`
  position: relative;
  width: 150px;
  top: 40px;
  left: 30px;
`;
export const Cidade = styled.Text`
  color: #404040;
  font-size: 35px;
  font-weight: 500;
`;

export const Bairro = styled.Text`
  color: #404040;
  font-size: 18px;
`;

export const Day = styled.Text`
  color: #404040;
  font-size: 18px;
  margin-top: 30px;
  font-weight: 500;
`;

export const TempWeather = styled.View`
  align-content: center;
  align-items: center;
  margin-top: 125px;
`;

export const Temp = styled.Text`
  font-size: 80px;
  color: #404040;
`;

export const MinMaxTemp = styled.View`
  align-content: space-between;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 95px;
`;

export const Min = styled.Text`
  font-size: 30px;
  color: #404040;
  margin-left: 30px;
`;
export const Max = styled.Text`
  font-size: 30px;
  color: #404040;
  margin-right: 30px;
`;
