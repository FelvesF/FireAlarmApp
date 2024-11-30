import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import {AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Header =({title}) => {
  const navigation = useNavigation();
  return (
  
    
    <View style={styles.header}>
      <Text style={styles.headertitle}>{title}</Text>
      <View style={styles.headericons}>
      <TouchableOpacity
            
            onPress={() => navigation.navigate('home')}
        >
            <AntDesign name="home" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
                
                onPress={() => navigation.navigate('about')}
              >
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <FontAwesome name="navicon" size={24} color="white" />
              </TouchableOpacity>
        </View>
    </View>
  
  );
};


const styles = StyleSheet.create({
  
    header: {
      height: 100,
      width : screenWidth,
      backgroundColor: 'pink',
      display: 'flex',
    flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    headertitle: {
       
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
headericons: {
   width: 150,
   height: 50,
   borderWidth: 2,
   borderColor: 'green',
   borderStyle: 'solid',
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-between',
    },

  });

export default Header
