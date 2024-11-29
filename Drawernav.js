import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

import Homescreen from './screens/homescreen';
import Aboutscreen from './screens/aboutscreen';
import Accountscreen from './screens/accountscreen';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
   
  },
  drawerbtn: {
    textAlign: 'center',
    justifyContent: 'center',
    height: 60,
    
    width: '100%',
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
  },
});


const Drawer = createDrawerNavigator();

const Drawernav = () => {
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
            <View></View>
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
              onPress={() => props.navigation.navigate('login')}
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
      options={{ headerTitle: 'FIRE ALARM',
        headerTitleStyle: {
          color: 'white',
          fontSize: 25, 
          textAlign: 'center',
          
          marginLeft: 10,
        },
        headerLeft: false,
        headerRight: () => {
          const navigation = useNavigation();
          return (
            <View style={{ flexDirection: 'row' }}>
<TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate('home')}
              >
                <AntDesign name="home" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate('about')}
              >
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <FontAwesome name="navicon" size={24} color="white" />
              </TouchableOpacity>
            </View>
          );
        },
headerStyle: {
height: 100,
backgroundColor: 'rgba(80, 26, 33, 1)',
elevation: 20,
}
         }}
       />
      <Drawer.Screen
      name="about"
      component={Aboutscreen}
      
      options={{ headerTitle: 'ABOUT US',
        headerTitleStyle: {
          color: 'white',
          fontSize: 25, 
          textAlign: 'center',
          
          marginLeft: 10,
        },
        headerLeft: false,
        headerRight: () => {
          const navigation = useNavigation();
          return (
            <View style={{ flexDirection: 'row' }}>
<TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate('home')}
              >
                <AntDesign name="home" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate('about')}
              >
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <FontAwesome name="navicon" size={24} color="white" />
              </TouchableOpacity>
            </View>
          );
        },
headerStyle: {
height: 100,
backgroundColor: 'rgba(80, 26, 33, 1)',
elevation: 20,
}
         }}
      />

<Drawer.Screen
      name="account"
      component={Accountscreen}
      
      options={{ headerTitle: 'MY PROFILE',
        headerTitleStyle: {
          color: 'white',
          fontSize: 25, 
          textAlign: 'center',
          
          marginLeft: 10,
        },
        headerLeft: false,
        headerRight: () => {
          const navigation = useNavigation();
          return (
            <View style={{ flexDirection: 'row' }}>
<TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate('home')}
              >
                <AntDesign name="home" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate('about')}
              >
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <FontAwesome name="navicon" size={24} color="white" />
              </TouchableOpacity>
            </View>
          );
        },
headerStyle: {
height: 100,
backgroundColor: 'rgba(80, 26, 33, 1)',
elevation: 20,
}
         }}
      />
    </Drawer.Navigator>
  );
};

export default Drawernav;