import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import COLORS from '../constants/colors';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter email and password');
      return;
    }

    try {
      const res = await axios.post('http://192.168.1.7:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      navigation.navigate('Home' as never, { user } as never);
    } catch (err: any) {
      Alert.alert('Login Failed', err.response?.data?.message || 'Try again');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/foodlogix-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to FoodLogix 👨‍🍳</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* Login Card */}
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={COLORS.gray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={COLORS.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showBtn}
          >
            <Text style={styles.showText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton title="Login" onPress={handleLogin} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: width * 0.45,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.secondary,
    width: '100%',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  showBtn: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  showText: {
    color: COLORS.accent,
    fontWeight: '600',
  },
  linkText: {
    marginTop: 24,
    color: COLORS.accent,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;