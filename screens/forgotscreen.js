// ForgotScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const ForgotScreen = ({ navigation }) => {
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setResetError('Please enter your email.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setSuccessMessage('Password reset email sent! Please check your inbox.');
      setResetError(''); // Clear any previous errors
    } catch (err) {
      // Handle Firebase error when email is not found or invalid
      if (err.code === 'auth/user-not-found') {
        setResetError('No user found with this email.');
      } else {
        setResetError('Error sending reset email: ' + err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reset Your Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your registered email"
        value={resetEmail}
        onChangeText={setResetEmail}
      />
      <Button title="Reset Password" onPress={handleForgotPassword} />
      {resetError ? <Text style={styles.error}>{resetError}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  success: {
    color: 'green',
    marginBottom: 12,
  },
});

export default ForgotScreen;
