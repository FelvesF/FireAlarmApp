import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/header';

const Homescreen =() => {
  return (
<SafeAreaView style={styles.safe}>
<StatusBar
    backgroundColor="rgba(80, 26, 33, 1)"
    barStyle="light-content"
  />
    <Header title='FIRE ALARM'/>
    <View style={styles.container}>
    
      <Text style={styles.text}>Home Screen</Text>
    </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
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

export default Homescreen;