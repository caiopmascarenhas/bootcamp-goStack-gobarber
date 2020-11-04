  
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Dashboard from '../../pages/Dashboard';
import ProviderSchedules from '../../pages/ProviderSchedules';

const {Navigator, Screen} = createBottomTabNavigator();

function BottomTabNavigator (){
  return (
    <Navigator
      tabBarOptions={{
        style:{
          elevation: 0,
          borderTopColor:'#28262e',
          shadowOpacity: 0,
          height: 40,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle:{
          flex: 0,
          width: 20,
          height: 20
        },
        labelStyle:{
          fontFamily: 'Roboto',
          fontWeight: '700',
          marginLeft: 16,
          fontSize: 13,
        },
        inactiveBackgroundColor: '#f4ede8',
        activeBackgroundColor: '#28262e',
        inactiveTintColor: '#C1BCCC',
        activeTintColor: '#ff9000',
      }}
    >
      <Screen
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarLabel: 'Cabeleireiros',
          tabBarIcon: ({color, size, focused}) =>{
            return (
              <Icon name="user" size={size} color={focused ? '#ff9000' : color} />
            )
          }
        }}
        />
      <Screen 
        name="ProviderSchedules" 
        component={ProviderSchedules}
        options={{
          tabBarLabel: 'Agenda',
          tabBarIcon: ({color, size, focused}) =>{
            return (
              <Icon name="book" size={size} color={focused ? '#ff9000' : color} />
            )
          }
        }}/>
    </Navigator>
  );
}

export default BottomTabNavigator