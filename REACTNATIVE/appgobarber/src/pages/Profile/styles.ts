import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex:1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 50 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #F4EDE8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 15px;
  padding: 20px 20px;

`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: 100%;
`;

export const UserAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-self: center;
  border-width: 2px ;
  border-color: #f4ede8
`;










