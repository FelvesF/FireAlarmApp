import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import {AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Header =({title}) => {
  const navigation = useNavigation();
   const [isAppReady, setAppReady] = useState(false);
      const [fontsLoaded] = useFonts({
        Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
      });

      
            useEffect(() => {
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
      


  return (
  
    
    <View style={styles.header}>
      <Text style={styles.headertitle}>{title}</Text>
      <View style={styles.headericons}>
     

              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
                <FontAwesome name="navicon" size={28} color="white" />
              </TouchableOpacity>
        </View>
    </View>
  
  );
};


const styles = StyleSheet.create({
  
    header: {
      height: 70,
      width : screenWidth,
      backgroundColor: 'rgba(80, 26, 33, 1)',
      display: 'flex',
    flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 18,
      elevation: 20,
    },
    headertitle: {
      fontFamily: 'Montserrat',
       color: 'white',
      fontSize: 32,
      fontWeight: 700,
      
    },
headericons: {
   width: 120,
   height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  
    },

  });

export default Header
