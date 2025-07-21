import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import COLORS from '../constants/colors';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const CartScreen = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigation = useNavigation();

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty');
      return;
    }

    Alert.alert('Confirm Order', 'Do you want to place this order?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
              Alert.alert('Login again', 'Token not found');
              return;
            }

            await axios.post(
              'http://192.168.1.7:5000/api/orders',
              { items: cart },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            Alert.alert('Success', 'Order placed successfully');
            clearCart();
            navigation.navigate('MyOrders' as never);
          } catch (err: any) {
            Alert.alert('Order Failed', err.response?.data?.message || 'Try again');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item, index }: any) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      duration={500}
      style={styles.card}
    >
      <View style={styles.row}>
        <Image
          source={
            item.name === 'Pizza'
              ? require('../assets/images/pizza.png')
              : item.name === 'Burger'
              ? require('../assets/images/burger.png')
              : item.name === 'Fries'
              ? require('../assets/images/fries.png')
              : item.name === 'Pasta'
              ? require('../assets/images/pasta.png')
              : item.name === 'Wraps'
              ? require('../assets/images/wrap.png')
              : item.name === 'Sandwich'
              ? require('../assets/images/sandwich.png')
              : item.name === 'Ice Cream'
              ? require('../assets/images/icecream.png')
              : item.name === 'Coke'
              ? require('../assets/images/coke.png')
              : require('../assets/images/pizza.png')
          }
          style={styles.image}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>🍴 {item.name}</Text>
          <Text style={styles.price}>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</Text>

          <View style={styles.controls}>
            <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
              <Text style={styles.controlBtn}>➖</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
              <Text style={styles.controlBtn}>➕</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.delete}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>😕 Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>💰 Total: ₹{getTotal()}</Text>

            <CustomButton title="Place Order" onPress={handleOrder} />
            <TouchableOpacity onPress={clearCart}>
              <Text style={styles.clearText}>❌ Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  price: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    resizeMode: 'contain',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  controlBtn: {
    fontSize: 22,
    color: COLORS.accent,
    paddingHorizontal: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 6,
  },
  delete: {
    fontSize: 20,
    color: 'red',
    paddingLeft: 8,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'right',
  },
  clearText: {
    color: 'red',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  empty: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 60,
  },
  footer: {
    marginTop: 10,
  },
});

export default CartScreen;
