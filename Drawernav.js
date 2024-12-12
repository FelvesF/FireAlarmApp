import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebaseConfig'; 
import { getDoc, doc} from "firebase/firestore"; 
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Homescreen from './screens/homescreen';
import Aboutscreen from './screens/aboutscreen';
import Accountscreen from './screens/accountscreen';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';




const Drawer = createDrawerNavigator();

function Drawernav ({ navigation })  {
   const [name, setName] = useState('');
    const [error, setError] = useState('');
 const [isAppReady, setAppReady] = useState(false);
    const [fontsLoaded] = useFonts({
      Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    });

    
          useEffect(() => {

            const fetchUserData = async () => {
              if (auth.currentUser) {
                try {
                  const userRef = doc(db, 'users', auth.currentUser.uid);  // Reference to the user's document in Firestore
                  const docSnap = await getDoc(userRef);
                  if (docSnap.exists()) {
                 
                    setName(docSnap.data().name);
                  
                  } else {
                    setError('No user data found.');
                  }
                } catch (err) {
                  setError('Error fetching user data');
                }
              }
            };
        
            fetchUserData();
            const prepareApp = async () => {
              try {
                await SplashScreen.preventAutoHideAsync();
        
                if (fontsLoaded) {
                  setAppReady(true);
                }
              } catch (e) {
                console.warn(e);
              } finally {
                if (fontsLoaded) await SplashScreen.hideAsync();
              }
            };
        
            prepareApp();
          }, [fontsLoaded]);
        
          if (!isAppReady) return null;
    
          



  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      // Redirect to login screen after logout
      // Use navigation or any method to go back to the login page
      navigation.replace('login'); // Assuming you're using React Navigation
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: 200,
        },
        drawerPosition: 'right',
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ flex: 1, backgroundColor: 'rgba(80, 26, 33, 1)' }}
        >
          <View style={styles.container}>
            <View style={styles.currentuser}>
              <Text style={styles.uservalue}>{name}</Text>
            <Text style={styles.userlabel}>Current User</Text>
            
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('home')}
              style={styles.drawerbtn}
            >
              <Text style={styles.text}>HOME</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('account')}
              style={styles.drawerbtn}
            >
              <Text style={styles.text}>ACCOUNT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('about')}
              style={styles.drawerbtn}
            >
              <Text style={styles.text}>ABOUT US</Text>
            </TouchableOpacity>
           
            <TouchableOpacity
             onPress={handleLogout}
              style={styles.drawerbtn}
            >
              <Text style={styles.text}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
      name="home"
      component={Homescreen}
      options={{ headerShown: false }}
       />
      <Drawer.Screen
      name="about"
      component={Aboutscreen}
      options={{ headerShown: false }}
      />

<Drawer.Screen
      name="account"
      component={Accountscreen}
      options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
   
  },
  currentuser: {

  height: 50,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
  },
  drawerbtn: {
    textAlign: 'center',
    justifyContent: 'center',
    height: 60,
    
    width: '100%',
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: 900,
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    flexWrap: 'wrap',
  },
  uservalue: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: 900,
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    flexWrap: 'wrap',
    textDecorationLine: 'underline',
    
  },
  userlabel: {
    fontFamily: 'Montserrat',
    fontSize: 10,
    fontWeight: 900,
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    marginTop: 5,
  },
});


export default Drawernav;