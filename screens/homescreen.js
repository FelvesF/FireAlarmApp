import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ref, onValue } from 'firebase/database';
import { realtimedb } from '../firebaseConfig';
import Header from '../components/header';

function Homescreen() {
  const [history, setHistory] = useState([]); // Store history
  const electricityRate = 11.7882; // PHP per kWh
  const bulbPower = 7; // watts

  useEffect(() => {
    // Fetch history from Firebase
    const timesRef = ref(realtimedb, 'times');
    onValue(timesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object into an array, add timestamp, and calculate cost
        const historyArray = Object.keys(data).map((key) => {
          const entry = data[key];
          const timeInSeconds = entry.time || 0;
          const cost = calculateCost(timeInSeconds);
          const timestampFromDb = entry.timestamp || ''; // Get the timestamp string from the DB

          return {
            id: key,
            time: entry.time,
            timestamp: timestampFromDb, // Use the 'timestamp' from Firebase
            cost,
          };
        });

        // Sort the data by timestamp (if it's a valid date string)
        const validHistoryArray = historyArray.filter((entry) => {
          return entry.timestamp && typeof entry.timestamp === 'string'; // Ensure it's a string
        });

        validHistoryArray.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Convert string to Date object for sorting

        // Limit to the latest 10 entries
        const limitedHistory = validHistoryArray.slice(-10);

        setHistory(limitedHistory);
      }
    });
  }, []); // Fetch data once on mount

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
        {/* History Section */}
        <Text style={styles.subtitle}>History</Text>
        {history.length > 0 ? (
          history.reverse().map((entry) => (
            <View key={entry.id} style={styles.card}>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Time: </Text>{' '}
                {entry.time ? entry.time.toFixed(2) : '0.00'} seconds
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Cost: </Text> ₱{entry.cost ? entry.cost.toFixed(6) : '0.000000'}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.boldText}>Added At: </Text> {entry.timestamp || 'N/A'}
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
  subtitle: {
    fontSize: 32,
    marginTop: 20,
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
});

export default Homescreen;
