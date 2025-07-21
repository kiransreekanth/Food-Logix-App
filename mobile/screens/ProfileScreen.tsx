import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../constants/colors';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
          });
        },
        style: 'destructive',
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Avatar */}
      <Image
        source={require('../assets/images/avatar.png')} // ✅ Replace with your own avatar icon
        style={styles.avatar}
      />

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.role}>Role: {user.role}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📧 Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <CustomButton
        title="Logout"
        onPress={handleLogout}
        style={styles.logoutBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.text,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  role: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: COLORS.accent,
    width: '100%',
  },
});

export default ProfileScreen;
