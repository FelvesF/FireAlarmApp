import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircularProgress } from 'react-native-circular-progress';
import Header from '../components/header';

function Homescreen () {

  const [temperature, setTemperature] = useState(50);
  const [popupTriggered, setPopupTriggered] = useState(false); // Ensure the popup triggers only once
  // Manually define alarms here
  const [alarms, setAlarms] = useState([
    { date: '2024-11-30', time: '10:30:00', count: 3 },
    { date: '2024-11-30', time: '11:00:00', count: 2 },
    { date: '2024-11-29', time: '14:30:00', count: 1 },
    { date: '2024-11-28', time: '09:15:00', count: 4 },
  ]);

  // Reintroduce the temperature fluctuation animation (simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prevTemp => {
        const fluctuation = Math.random() > 0.5 ? 1 : -1; // Randomly choose -1 or +1
        return prevTemp + fluctuation;  // Add the fluctuation to the current temperature
      });
    }, 3000);

    return () => clearInterval(interval);  // Cleanup on component unmount
  }, []); // Empty dependency array to run only once when the component mounts

  const handleAlert = () => {
    if (!popupTriggered) {
      const color = getThermometerColor();
      let message = '';
      if (color === '#f44336') {
        message = 'Danger! The temperature is too high, it may cause a fire!';
      } else if (color === '#ff9800') {
        message = 'Mid Danger! The temperature is moderate, it may cause harm!';
      } else if (color === '#28a745') {
        message = 'OK! The temperature is within safe limits.';
      }

      Alert.alert('Fire Alarm Warning', message, [
        {
          text: 'OK',
          onPress: () => setPopupTriggered(true),
        },
      ]);
    }
  };

  const togglePopup = () => {
    setPopupTriggered(false); // Reset to allow alert to trigger again when temperature changes
    handleAlert(); // Check and trigger the alert
  };

  const getThermometerColor = () => {
    if (temperature <= 25) return '#28a745'; // Green
    if (temperature <= 35) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  return (
<SafeAreaView style={styles.safe}>
<StatusBar
    backgroundColor="rgba(80, 26, 33, 1)"
    barStyle="light-content"
  />
    <Header title='FIRE ALARM'/>
    <ScrollView style={styles.container}>

      <View style={styles.body}>
        <Text style={styles.title}>Fire Alarm System</Text>
        <Text style={styles.temperature}>Temperature: {temperature}°C</Text>
        <CircularProgress
          size={200}
          width={15}
          fill={temperature}  // Update the temperature value here
          tintColor={getThermometerColor()}  // Set the color based on temperature
          backgroundColor="#e0e0e0"
        />
      </View>

      <View style={styles.alarmInfoContainer}>
        <Text style={styles.alarmTitle}>Total Active Alarms: {alarms.length}</Text>
        <Text style={styles.recentAlarmTitle}>Recent Alarms:</Text>

        {/* Render alarms list */}
        {alarms.length > 0 && (
          <View style={styles.recentAlarm}>
            {alarms.map((alarm, index) => (
              <View key={index} style={styles.recentAlarmRow}>
                <View style={styles.recentAlarmColumn}>
                  <Text style={styles.recentAlarmText}>{alarm.date}</Text>
                </View>
                <View style={styles.recentAlarmColumn}>
                  <Text style={styles.recentAlarmText}>{alarm.time}</Text>
                </View>
                <View style={styles.recentAlarmColumn}>
                  <Text style={styles.recentAlarmText}>{alarm.count}</Text>
                </View>
                <View style={styles.separator} /> 
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.graphContainer}>
        <Text style={styles.graphTitle}>Total Alarms in the Last 7 Days:</Text>
        <View style={styles.graph}>
          {[3, 5, 7, 2, 4, 6, 3].map((data, index) => (
            <View
              key={index}
              style={[styles.graphBar, { height: data * 10, backgroundColor: '#f44336', marginLeft: 5 }]}
            />
          ))}
        </View>
      </View>
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
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  body: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 20,
    marginBottom: 20,
  },
  alarmInfoContainer: {
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 70,
  },
  alarmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentAlarmTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  recentAlarm: {
    marginTop: 10,
    width: '100%',
  },
  recentAlarmRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  recentAlarmColumn: {
    flex: 1,
    alignItems: 'center',
  },
  recentAlarmText: {
    fontSize: 14,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  graphContainer: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  graph: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  graphBar: {
    width: 30,
    marginRight: 5,
    backgroundColor: '#f44336',
  },

});

export default Homescreen;