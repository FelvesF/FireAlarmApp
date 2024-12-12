import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircularProgress } from 'react-native-circular-progress';
import Header from '../components/header';

function Homescreen () {


  return (
<SafeAreaView style={styles.safe}>
<StatusBar
    backgroundColor="rgba(80, 26, 33, 1)"
    barStyle="light-content"
  />
    <Header title='LIGHT EASE'/>
    <ScrollView style={styles.container}>
<Text style={{display: 'flex', fontSize: 30, alignSelf: 'center'}}>Homescreen</Text>
    </ScrollView>
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
    backgroundColor: '#f8f9fa',
  },
});

export default Homescreen;