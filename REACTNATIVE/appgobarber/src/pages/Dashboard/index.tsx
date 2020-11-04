import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import iconProfile from '../../assets/account-circle.png';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
  ContentoProfile,
  ButtonLogout
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    })
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppintment = useCallback((providerId: string) => {
    navigate('CreateAppointment', { providerId });
  }, [navigate]);

  const handleLogout = useCallback(() => {
    signOut();
  }, [signOut]);

  const open = useCallback((navigation) => {
    navigation.openDrawer()
  }, [])

  return (
    <Container>

      <Header>
        <ContentoProfile>
          <ProfileButton onPress={open}>
            <UserAvatar source={user.avatar_url === null ? iconProfile : { uri: user.avatar_url }} />
          </ProfileButton>
          <HeaderTitle>
            Bem vindo, {"\n"}
            <UserName>{user.name}</UserName>
          </HeaderTitle>
        </ContentoProfile>
        <ButtonLogout onPress={handleLogout}>
          <Icon name="power" size={20} color="#ff9000" />
        </ButtonLogout>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabelereiros</ProvidersListTitle>}
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => navigateToCreateAppintment(provider.id)}>
            <ProviderAvatar source={provider.avatar_url === null ? iconProfile : { uri: provider.avatar_url }} />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segnda à sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>08h Às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />

    </Container>
  );
};

export default Dashboard;