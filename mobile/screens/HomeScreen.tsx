import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import COLORS from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUsername(user.name || 'User');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
          });
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Animatable.Image
        animation="fadeInDown"
        duration={1000}
        delay={200}
        source={require('../assets/images/foodlogix-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Greeting */}
      <Animatable.Text animation="fadeInUp" delay={400} style={styles.greeting}>
        Hello, {username} 👋
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" delay={600} style={styles.tagline}>
        Welcome to FoodLogix – Smart, Simple & Delicious
      </Animatable.Text>

      {/* Order Section */}
      <Animatable.View animation="fadeIn" delay={800} style={styles.card}>
        <Text style={styles.sectionTitle}>🍱 Order</Text>
        <Animatable.View animation="bounceIn" delay={900}>
          <CustomButton
            title="Place a New Order"
            onPress={() => navigation.navigate('PlaceOrder' as never)}
          />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1000}>
          <CustomButton
            title="View My Orders"
            onPress={() => navigation.navigate('MyOrders' as never)}
          />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1100}>
          <CustomButton
            title="View Cart"
            onPress={() => navigation.navigate('Cart' as never)}
          />
        </Animatable.View>
      </Animatable.View>

      {/* Account Section */}
      <Animatable.View animation="fadeIn" delay={1200} style={styles.card}>
        <Text style={styles.sectionTitle}>👤 Account</Text>
        <Animatable.View animation="bounceIn" delay={1300}>
          <CustomButton
            title="My Profile"
            onPress={() => navigation.navigate('Profile' as never)}
          />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1400}>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </Animatable.View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.4,
    height: 80,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.secondary,
    width: '100%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: COLORS.accent,
    marginTop: 10,
  },
});

export default HomeScreen;
