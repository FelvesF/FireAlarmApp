import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { auth, db } from '../firebaseConfig';  // Import Firestore and auth
import { getDoc, doc, updateDoc } from "firebase/firestore";  // Firestore functions to get and update documents
import { updatePassword, updateEmail } from 'firebase/auth';  // Firebase Auth functions
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import Header from '../components/header';



const Accountscreen = ({ navigation }) => {
  const navigations = useNavigation();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userRef = doc(db, 'users', auth.currentUser.uid);  // Reference to the user's document in Firestore
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUser(docSnap.data());  // Set user data from Firestore
            setName(docSnap.data().name);
            setEmail(auth.currentUser.email);  // Firebase Auth email (can be used as read-only)
          } else {
            setError('No user data found.');
          }
        } catch (err) {
          setError('Error fetching user data');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, { name });

      if (email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, email);
      }

      if (password) {
        await updatePassword(auth.currentUser, password);
      }

      setLoading(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  // Custom Button Component
  const CustomButton = ({ title, onPress, style }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log('User logged out successfully');
        // Redirect to login screen after logout
        // Use navigation or any method to go back to the login page
        navigations.navigate('login'); // Assuming you're using React Navigation
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    };

  return (

    <SafeAreaView style={styles.safe}>
       <StatusBar
    backgroundColor="rgba(80, 26, 33, 1)"
    barStyle="light-content"
  />
    <Header title='MY PROFILE'/>

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Different behavior for iOS and Android
    >
      
       

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.profileImageContainer}>
          <SafeAreaView>
            <Image style={styles.image1} source={require('../assets/images/profile.png')} />
          </SafeAreaView>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName} 
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          editable={false} 
        />

        <TextInput
          style={styles.input}
          placeholder="**********"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <CustomButton
          title={loading ? 'Updating...' : 'Update Profile'}
          onPress={handleUpdateProfile}
          style={{ backgroundColor: '#00a6bd' }}
        />

        <CustomButton
          title="Logout"
          onPress={handleLogout}
          style={{ backgroundColor: '#501a21' }}
        />
    </KeyboardAvoidingView>

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
  },
  header: {
    height: 100,
    backgroundColor: '#501a21',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',  // Space between the icon and title
    paddingHorizontal: 15,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    width: 194,
    height: 130,
    top: 57,
    right: 5,
  },
  menu: {
    color: 'white',
    width: 194,
    height: 130,
    top: 63,
    left: 100,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  profileImageContainer: {
    marginVertical: 40,
  },
  image1: {
    padding: 70,
    height: 150,
    width: 150,
    borderRadius: 90,
    backgroundColor: '#501a21',
    left: 100,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    left: 30,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  button: {
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    left: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Accountscreen;
