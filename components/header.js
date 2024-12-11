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
       color: 'white',
      fontSize: 28,
      fontWeight: 'bold',
      
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
