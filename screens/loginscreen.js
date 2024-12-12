import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, StatusBar, Dimensions, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Loginscreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAppReady, setAppReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        if (fontsLoaded) {
          setAppReady(true);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded) await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!isAppReady) return null;

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('drawernav');
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        Alert.alert('Invalid Credentials', 'The email or password you entered is incorrect.');
      } else {
        Alert.alert('Error', err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <View style={styles.title}>
        <Text style={styles.titleText}>Light</Text>
        <Text style={styles.titleText}>Ease</Text>
      </View>

      <View style={styles.bgview}>
        <Image style={styles.bg} source={require('../assets/images/lightbg.png')} />
      </View>

      <View style={styles.loginform}>
        <Text style={styles.logintitle}>Log In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(44, 29, 27, 0.8)"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(44, 29, 27, 0.8)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('forgot')}
          style={styles.forgot}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('register')}
          style={styles.forgot}
        >
          <Text style={styles.forgotText}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: screenWidth,
  },
  bgview: {
    position: 'absolute',
    zIndex: 1,
    top: screenHeight * 0,
  },
  bg: {
    width: screenWidth,
    bottom: screenHeight * 0.1,
    resizeMode: 'contain',
  },
  title: {
    width: screenWidth,
    height: 100,
    display: 'flex',
    position: 'absolute',
    top: screenHeight * 0.07,
    zIndex: 2,
    paddingLeft: 20,
  },
  titleText: {
    fontFamily: 'Montserrat',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 70,
    fontWeight: 700,
    marginBottom: -25,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
  },
  logintitle: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: 800,
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 20,
    marginTop: 20,
  },
  loginform: {
    height: screenHeight * 0.38,
    width: screenWidth,
    backgroundColor: 'rgba(80, 26, 33, 1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    zIndex: 3,
  },
  input: {
    fontFamily: 'Montserrat',
    backgroundColor: 'rgba(217, 217, 217, 1)',
    width: 250,
    height: 42,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    borderRadius: 5,
    height: 30,
    aspectRatio: 32 / 10,
    marginTop: 5,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat',
    color: 'rgba(44, 29, 27, 0.8)',
    fontSize: 15,
    textAlign: 'center',
  },
  forgotText: {
    fontFamily: 'Montserrat',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12,
    marginBottom: 5,
  },
  forgot: {
    fontFamily: 'Montserrat',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default Loginscreen;
