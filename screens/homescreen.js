import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Header from '../components/header';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

});

const Homescreen =() => {
  return (

    <View style={styles.container}>
  
    <Header title='Homepage'/>
      <Text style={styles.text}>Home Screen</Text>
    </View>
    
  );
};


export default Homescreen;