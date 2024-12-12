import { StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig'; 
import Loginscreen from './screens/loginscreen';
import Registerscreen from './screens/registerscreen';
import ForgotScreen from './screens/forgotscreen';
import Drawernav from './Drawernav';


StatusBar.setTranslucent(true);

const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle the loading state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once we get the auth state
    });
    return unsubscribe; // Cleanup listener on unmount
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {user ? (
        
        <>
        <Stack.Screen name="drawernav" component={Drawernav} options={{ headerShown: false }}/>
       <Stack.Screen name="login" component={Loginscreen} options={{ headerShown: false }} />
       <Stack.Screen name="register" component={Registerscreen} options={{ headerShown: false }}/>
       
       </>
           
        ) : (
          <>
    
        <Stack.Screen name="login" component={Loginscreen} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={Registerscreen} options={{ headerShown: false }}/>
        <Stack.Screen name="drawernav" component={Drawernav} options={{ headerShown: false }}/>
        <Stack.Screen name="forgot" component={ForgotScreen} options={{ headerShown: false }}/>
       </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}







