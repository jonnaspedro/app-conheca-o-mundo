import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Telainicialscreen from './Telainicialscreen';
import Favoritosscreen from './Favoritosscreen';
import Meuperfilscreen from './Meuperfilscreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {

  return (

    <Tab.Navigator

      screenOptions={{

        headerShown: false,

        tabBarActiveTintColor: '#0D6EFD',

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
        },

      }}

    >

      <Tab.Screen
        name="Inicio"
        component={Telainicialscreen}
      />

      <Tab.Screen
        name="Favoritos"
        component={Favoritosscreen}
      />

      <Tab.Screen
        name="Perfil"
        component={Meuperfilscreen}
      />

    </Tab.Navigator>

  );

}