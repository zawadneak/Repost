import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #333;
  padding: 0px 30px;
`;

export const Box = styled.View`
  margin: 10px 0px;
  align-self: stretch;
  background-color: #444;
  border-radius: 15px;
  padding: 15px 30px;
`;

export const Picture = styled.Image`
  height: 300px;
  width: 300px;
  border-radius: 10px;
  resize-mode: cover;
  margin: 0 auto;
`;

export const Description = styled.Text`
  color: #fff;
  margin-top: 20px;
`;

export const RepostButton = styled.TouchableOpacity`
  margin-top: 20px;
`;
export const Gradient = styled(LinearGradient).attrs({
  colors: ['#FEDA75', '#FA7E1E', '#D62976', '#3E2FBF', '#4F5BD5'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
`;

export const Label = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
`;
