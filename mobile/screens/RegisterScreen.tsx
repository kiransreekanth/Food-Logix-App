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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import COLORS from '../constants/colors';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    try {
      await axios.post('http://192.168.1.7:5000/api/auth/register', {
        name,
        email,
        password,
      });

      Alert.alert('Success', 'User registered! Please login.');
      navigation.navigate('Login' as never);
    } catch (err: any) {
      Alert.alert('Registration Failed', err.response?.data?.message || 'Try again');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Image
            source={require('../assets/images/foodlogix-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Create your FoodLogix account 🍴</Text>

          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={COLORS.gray}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLORS.gray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.gray}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showBtn}
              >
                <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>

            <CustomButton title="Register" onPress={handleRegister} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 20,
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

export default RegisterScreen;