import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #333;
  flex: 1;
`;

export const Wrapper = styled.View`
  flex: 1;
  padding: 0px 30px;
  opacity: ${props => (props.loading ? 0.5 : 1)};
`;

export const List = styled.FlatList``;

export const Post = styled.TouchableOpacity`
  align-self: stretch;
  background-color: #444;
  margin: 10px 0px;
  border-radius: 15px;
  padding: 15px;
  flex-direction: row;
`;

export const PostImage = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 10px;
  margin: 0px 10px;
`;

export const TextHolder = styled.View`
  width: 70%;
`;

export const User = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #fff;
`;
