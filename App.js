import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Screens/Login';
import Home from './Screens/Home';

import Business from './Screens/Categories/Business';
import Technology from './Screens/Categories/Technology';
import Science from './Screens/Categories/Science';
import Health from './Screens/Categories/Health';
import { getData } from './utils/storage';

const Stack = createStackNavigator();

function NavStack() {

  const [username, setUsername] = useState('');

  useEffect(() => {
    (async () => {
      setUsername(await getData('username'))
      //  console.log('useEffect',await getData('username'))
    })();
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#621FF7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {username == null ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Login' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="Business"
            component={Business}
            options={{ title: 'Business' }}
          />
          <Stack.Screen
            name="Technology"
            component={Technology}
            options={{ title: 'Technology' }}
          />
          <Stack.Screen
            name="Science"
            component={Science}
            options={{ title: 'Science' }}
          />
          <Stack.Screen
            name="Health"
            component={Health}
            options={{ title: 'Health' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}