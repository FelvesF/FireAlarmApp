import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/header';



const Aboutscreen =() => {
  return (
    
    <View style={styles.container}>
      <Header title='About Us'/>
      <Text style={styles.text}>About us Screen</Text>
    </View>
   
  );
};

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

export default Aboutscreen;