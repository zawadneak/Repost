import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity, Linking } from 'react-native';

import Home from './pages/Home/index';
import Repost from './pages/Repost/index';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#444',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Repost',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => Linking.openURL('instagram://app')}
              style={{ marginRight: 30 }}
            >
              <Icon name="instagram" color="#fff" size={25} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Repost"
        component={Repost}
        options={{
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#444',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Is this it?',
        }}
      />
    </Stack.Navigator>
  );
}
