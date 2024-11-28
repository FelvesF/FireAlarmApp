import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
      bottom: screenHeight * 0.2,
resizeMode:'stretch',
    },

    title: {
      width: screenWidth,
      height: 100,
  
   display:'flex',
   
   position: 'absolute',
   top: screenHeight * 0.1,
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
      fontSize: 20,
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

const Registerscreen = ({ navigation }) => {
    return (
      <View style={styles.container}>

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
          
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(44, 29, 27, 0.8)"
            
          
          />
<TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(44, 29, 27, 0.8)"
            
          
          />


 <TouchableOpacity
          onPress={() => navigation.navigate('login')}
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
  

export default Registerscreen