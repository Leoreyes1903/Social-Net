import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { signUp } from '../api/signUpAPI'; 

export default SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async () => {
    setErrorMessage('');
    setSuccessMessage('');
  
    // Simple validation
    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
  
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }
  
    try {
      const data = await signUp(username, email, password);  // Now receiving the token
      setSuccessMessage('Signup successful! Please login');
      
      // Store the token securely
      await SecureStore.setItemAsync('token', data.token);
      
      // Navigate to the Login screen (or Home)
      navigation.navigate('Login');
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during signup');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    color: '#333',
  },
  button: {
    backgroundColor: '#46a65e', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    margin: 12,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: 'green', 
    marginBottom: 10,
    textAlign: 'center',
  },
});
