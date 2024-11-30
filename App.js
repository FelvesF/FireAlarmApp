import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginscreen from './screens/loginscreen';
import Registerscreen from './screens/registerscreen';
import Drawernav from './Drawernav';

StatusBar.setTranslucent(true);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">

        <Stack.Screen name="login" component={Loginscreen} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={Registerscreen} options={{ headerShown: false }}/>
        <Stack.Screen name="drawernav" component={Drawernav} options={{ headerShown: false }}/>
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}