import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Image, Dimensions } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';  // Import Firestore
import { setDoc, doc } from "firebase/firestore";  // Firestore functions to add documents

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;




const Registerscreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added name state
  const [error, setError] = useState('');

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
 {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.title}>
  <Text style={styles.titleText}>FIRE</Text>
  <Text style={styles.titleText}>ALARM</Text>
  <Text style={styles.titleText2}>Detect. Alert. Protect.</Text>
  </View>

<View>
<Image style={styles.bg} source={require('../assets/images/firealarmbg.png')}></Image>

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
    bg: {
      width: screenWidth,
      bottom: screenHeight * 0.18,
resizeMode:'stretch',
    },

    title: {
      width: screenWidth,
      height: 100,
  
   display:'flex',
   
   position: 'absolute',
   top: screenHeight * 0.15,
zIndex: 1,
paddingLeft: 20,
    },

    titleText: {
      color:  'rgba(255, 255, 255, 1)',
      fontSize: 50,
      marginBottom: -10,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    },

    titleText2: {
      color:  'rgba(255, 255, 255, 1)',
      fontSize: 17,
      marginTop : 10,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    },

    register: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'rgba(255, 255, 255, 1)',
      marginBottom: 25,
      marginTop: 25,
    },
    registerform: {
      height : screenHeight * 0.43,
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
    },

    input: {
      backgroundColor: 'rgba(217, 217, 217, 1)',
      width:250,
      height:42,
      marginBottom: 15,
      paddingLeft: 10,
      borderRadius: 5,
    },



    button: {
      backgroundColor: 'rgba(217, 217, 217, 1)',
      
      borderRadius: 5,
      height: 30,
      aspectRatio: 32/10,
      marginTop: 5,
      marginBottom: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'rgba(44, 29, 27, 0.8)',
      fontSize: 15,
textAlign:'center',
    },
    forgotText: {
      color:  'rgba(255, 255, 255, 1)',
      fontSize: 12,
    },


    forgot: {
fontSize: 10,
color : 'rgba(255, 255, 255, 1)',
    },
  
  });
  

export default Registerscreen