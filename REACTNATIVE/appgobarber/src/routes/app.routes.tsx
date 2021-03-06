import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';
import AppointmentCreated from '../pages/AppointmentCreated';
import CreateAppointment from '../pages/CreateAppointment';
import ProviderSchedules from '../pages/ProviderSchedules';
import BottomTabNavigator from '../components/BottomTabNavigator';
import Profile from '../pages/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator screenOptions={{
    headerShown: false,
    cardStyle: {backgroundColor: '#312E38'}
  }}
  >
    <App.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="AppointmentCreated" component={AppointmentCreated} />
    <App.Screen name="CreateAppointment" component={CreateAppointment} />
    <App.Screen name="ProviderSchedules" component={ProviderSchedules} />
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppRoutes;