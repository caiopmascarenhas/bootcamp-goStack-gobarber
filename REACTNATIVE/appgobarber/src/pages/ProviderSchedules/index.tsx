import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import iconProfile from '../../assets/account-circle.png';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {
  Container,
  Schedule,
  Header,
  TitleHeader,

  TextContent,

  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,

  Section,

  SectionTitle,
  SectionContent,
  BackButton,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMetaText,
  ProviderMeta,
} from './styles';
import { Platform, ScrollView } from 'react-native';

interface MonthAvailabilityItem {
  day: number;
  available: boolean
}

export interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string
  }
}

const ProviderSchedules: React.FC = () => {

  const { user } = useAuth();
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback((event: any, date: Date | undefined) => {

    if (Platform.OS === 'android') {
      setShowDatePicker(false)
    }

    if (date) {
      setSelectedDate(date);
    }

  }, []);

  useEffect(() => {
    api.get(`providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      },
    }).then(response => {
      setMonthAvailability(response.data)
    })
  }, [currentMonth, user.id])

  useEffect(() => {
    api.get<Appointment[]>('appointments/schedule', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      }
    }).then(response => {
      const appointmentsFormatted = response.data.map(appointment => {
        return {
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }
      })
      setAppointments(appointmentsFormatted);
    })
  }, [selectedDate])

  const morningAppintments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    })
  }, [appointments]);

  const afternoongAppintments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    })
  }, [appointments]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, " dd 'de' MMMM 'de' YYY", {
      locale: ptBR,
    })
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'ccc', {
      locale: ptBR,
    })
  }, [selectedDate]);

  return (

    <Container>
      <Schedule>
        <Header>
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>
          <TitleHeader>Meus agendamentos</TitleHeader>
        </Header>
        <ScrollView>
          <Calendar>
            <Title>{selectedWeekDay}{' -'}{selectedDateAsText}</Title>
            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
            </OpenDatePickerButton>
            {showDatePicker && (<DateTimePicker
              mode="date"
              display="calendar"
              onChange={handleDateChanged}
              value={selectedDate}
            />)}
          </Calendar>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAppintments.length === 0 && (
                <TextContent>Nenhum agendamento para este período</TextContent>
              )}
              {morningAppintments.map(appointment => (
                <ProviderContainer>
                  <ProviderAvatar source={appointment.user.avatar_url === null ? iconProfile : { uri: appointment.user.avatar_url }} />
                  <ProviderInfo>
                    <ProviderName>{appointment.user.name}</ProviderName>
                    <ProviderMeta>
                      <Icon name="clock" size={14} color="#ff9000" />
                      <ProviderMetaText>{appointment.hourFormatted}</ProviderMetaText>
                      <ProviderMetaText></ProviderMetaText>
                    </ProviderMeta>
                  </ProviderInfo>
                </ProviderContainer>
              ))}
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoongAppintments.length === 0 && (
                <TextContent>Nenhum agendamento para este período</TextContent>
              )}
              {afternoongAppintments.map(appointment => (
                <ProviderContainer>
                  <ProviderAvatar source={appointment.user.avatar_url === null ? iconProfile : { uri: appointment.user.avatar_url }} />
                  <ProviderInfo>
                    <ProviderName>{appointment.user.name}</ProviderName>
                    <ProviderMeta>
                      <Icon name="clock" size={14} color="#ff9000" />
                      <ProviderMetaText>{appointment.hourFormatted}</ProviderMetaText>
                    </ProviderMeta>
                  </ProviderInfo>
                </ProviderContainer>
              ))}
            </SectionContent>
          </Section>
        </ScrollView>
      </Schedule>
    </Container>
  );
};

export default ProviderSchedules;