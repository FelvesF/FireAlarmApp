import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Image, StatusBar, Dimensions } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';  // Import Firestore
import { setDoc, doc } from "firebase/firestore";  // Firestore functions to add documents
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;




const Registerscreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added name state
  const [error, setError] = useState('');
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

  const handleRegister = async () => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // After user is registered, add a document to Firestore
      const userRef = doc(db, "users", user.uid);  // Create a new document with the user's UID
      await setDoc(userRef, {
        name: name || "Default Name",  // Set default name if not provided
        profilePicture: "https://example.com/default-avatar.jpg", // Placeholder profile image URL
      });

      navigation.navigate('login');
    } catch (err) {
      setError(err.message);
    }
  };

    return (
      <View style={styles.container}>
         <StatusBar
                        barStyle="light-content"
                        translucent={true}
                        backgroundColor="transparent"
                      />
 {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.title}>
<Text style={styles.titleText}>Light</Text>
  <Text style={styles.titleText}>Ease</Text>
  </View>

<View style={styles.bgview}>
<Image style={styles.bg} source={require('../assets/images/lightbg.png')}></Image>

</View>

        <View style={styles.registerform}>
        <Text style={styles.register}>Register Account</Text>
        <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="rgba(44, 29, 27, 0.8)"
            value={name}
        onChangeText={setName}
          
          />
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
         onPress={handleRegister}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('login')}
          style={styles.forgot}
        >
          <Text style={styles.forgotText}>Already have an account?</Text>
        </TouchableOpacity>
       
      
        


        </View>
        
      </View>
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:'flex',
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
resizeMode:'contain',
    },

    title: {
      width: screenWidth,
      height: 100,
  
   display:'flex',
   
   position: 'absolute',
   top: screenHeight * 0.07,
zIndex: 2,
paddingLeft: 20,
    },

    titleText: {
      fontFamily: 'Montserrat',
      color:  'rgba(255, 255, 255, 1)',
      fontSize: 70,
      fontWeight: 700,
      marginBottom: -25,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    },

    titleText2: {
      fontFamily: 'Montserrat',
      color:  'rgba(255, 255, 255, 1)',
      fontSize: 17,
      marginTop : 10,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    },

    register: {
      fontFamily: 'Montserrat',
      fontSize: 24,
      fontWeight: 800,
      color: 'rgba(255, 255, 255, 1)',
      marginBottom: 20,
      marginTop: 20,
    },
    registerform: {
      height : screenHeight * 0.42,
      width: screenWidth,
      backgroundColor:'rgba(80, 26, 33, 1)',
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'center',
     position: 'absolute',
     bottom: 0,
      borderTopLeftRadius: 33,
      borderTopRightRadius: 33,
      zIndex: 3,
    },

    input: {
      fontFamily: 'Montserrat',
      backgroundColor: 'rgba(217, 217, 217, 1)',
      width:250,
      height:42,
      marginBottom: 12,
      paddingLeft: 10,
      borderRadius: 10,
    },



    button: {
      backgroundColor: 'rgba(217, 217, 217, 1)',
      
      borderRadius: 5,
      height: 30,
      aspectRatio: 32/10,
      marginTop: 5,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontFamily: 'Montserrat',
      color: 'rgba(44, 29, 27, 0.8)',
      fontSize: 15,
textAlign:'center',
    },
    forgotText: {
      fontFamily: 'Montserrat',
      color:  'rgba(255, 255, 255, 1)',
      fontSize: 12,
    },


    forgot: {
      fontFamily: 'Montserrat',
fontSize: 10,
color : 'rgba(255, 255, 255, 1)',
    },
  
  });
  

export default Registerscreen