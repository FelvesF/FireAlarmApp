import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ref, onValue, push, set } from 'firebase/database';
import { realtimedb } from '../firebaseConfig';
import Header from '../components/header';

function Homescreen() {
  const [timeElapsed, setTimeElapsed] = useState(0); // Time in seconds
  const [cost, setCost] = useState(0); // Cost in PHP
  const [history, setHistory] = useState([]); // Store history
  const electricityRate = 11.7882; // PHP per kWh
  const bulbPower = 7; // watts
  const [startTime, setStartTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Clear interval on component unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    // Fetch history from Firebase
    const timesRef = ref(realtimedb, 'times');
    onValue(timesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object into an array, add timestamp, and sort
        const historyArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        // Filter out invalid entries with invalid timestamps
        const validHistory = historyArray.filter(entry => {
          const timestamp = entry.timestamp;
          return timestamp && !isNaN(timestamp); // Ensure valid timestamp
        });

        // Sort the data by timestamp in descending order
        validHistory.sort((a, b) => b.timestamp - a.timestamp);

        // Only take the latest 10 records
        const limitedHistory = validHistory.slice(0, 10);

        setHistory(limitedHistory);
      }
    });
  }, []); // Fetch data once on mount

  // Function to start the timer
  const startTimer = () => {
    const start = Date.now();
    setStartTime(start);

    const id = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = (currentTime - start) / 1000; // in seconds
      setTimeElapsed(elapsed);
      setCost(calculateCost(elapsed));
    }, 1000);

    setIntervalId(id);
  };

  // Function to stop the timer and save data to Firebase
  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    if (startTime) {
      const endTime = Date.now();
      const elapsed = (endTime - startTime) / 1000; // in seconds
      setTimeElapsed(elapsed);

      // Save elapsed time to Firebase along with timestamp
      const timesRef = ref(realtimedb, 'times');
      const newTimeRef = push(timesRef);
      set(newTimeRef, {
        time: elapsed,
        cost: calculateCost(elapsed),
        timestamp: Date.now(), // Store timestamp as number
      });
    }
  };

  // Function to calculate the cost based on elapsed time
  const calculateCost = (timeInSeconds) => {
    const powerInKW = bulbPower / 1000; // Convert watts to kilowatts
    const timeInHours = timeInSeconds / 3600; // Convert seconds to hours
    const energyConsumed = powerInKW * timeInHours; // kWh
    return energyConsumed * electricityRate; // Cost in PHP
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="rgba(80, 26, 33, 1)" barStyle="light-content" />
      <Header title="LIGHT EASE" />
      <ScrollView style={styles.container}>

        <Text style={styles.subtitle1}>Light Consumption</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            <Text style={styles.boldText}>Time: </Text>{' '}
            {timeElapsed ? timeElapsed.toFixed(2) : '0.00'} seconds
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.boldText}>Cost: </Text>
            ₱{cost ? cost.toFixed(6) : '0.000000'}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text onPress={startTimer} style={styles.button1}>
            Start
          </Text>
          <Text onPress={stopTimer} style={styles.button2}>
            Stop
          </Text>
        </View>

        {/* History Section */}
        <Text style={styles.subtitle2}>History</Text>
        {history.length > 0 ? (
          history.map((entry) => (
            <View key={entry.id} style={styles.card}>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Time: </Text>{' '}
                {entry.time ? entry.time.toFixed(2) : '0.00'} seconds
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Cost: </Text> ₱{entry.cost ? entry.cost.toFixed(6) : '0.000000'}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Timestamp: </Text> {new Date(entry.timestamp).toLocaleString() || 'N/A'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.cardText}>No history available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 20,
  },
  subtitle1: {
    fontSize: 32,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle2: {
    fontSize: 32,
    marginTop: 80,
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    marginVertical: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button1: {
    backgroundColor: '#04AA6D',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  button2: {
    backgroundColor: '#e12d27',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Homescreen;
