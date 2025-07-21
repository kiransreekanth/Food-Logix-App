import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import COLORS from '../constants/colors';
import { useCart } from '../contexts/CartContext';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  status: string;
  createdAt: string;
}

type RouteParams = {
  OrderDetails: {
    order: Order;
  };
};

const OrderDetailsScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'OrderDetails'>>();
  const { order } = route.params;
  const { addToCart } = useCart();

  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getStatusStyle = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === 'placed') return styles.badgePlaced;
    if (lower === 'preparing') return styles.badgePreparing;
    if (lower === 'delivered') return styles.badgeDelivered;
    if (lower === 'cancelled') return styles.badgeCancelled;
    return {};
  };

  const handleRepeatOrder = () => {
    order.items.forEach(item => {
      addToCart({
        id: `${item.name}-${Math.random()}`, // Prevent duplicate keys
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
    });
    Alert.alert('Added to Cart', 'This order has been added to your cart.');
  };

  const handleDownloadReceipt = async () => {
    const fileName = `Receipt_${order._id}.txt`;
    const fileUri = FileSystem.documentDirectory + fileName;

    const content = `
===== FOODLOGIX RECEIPT =====
Order ID: ${order._id}
Date: ${new Date(order.createdAt).toLocaleString()}
Status: ${order.status.toUpperCase()}

Items:
${order.items.map(i => `- ${i.name} x${i.quantity} = ₹${i.price * i.quantity}`).join('\n')}

Total: ₹${total}
==============================
`;

    await FileSystem.writeAsStringAsync(fileUri, content);
    await Sharing.shareAsync(fileUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📄 Order Summary</Text>

      <View style={styles.metadata}>
        <Text style={styles.label}>🆔 Order ID:</Text>
        <Text style={styles.value}>{order._id}</Text>

        <Text style={styles.label}>🗓️ Date:</Text>
        <Text style={styles.value}>{new Date(order.createdAt).toLocaleString()}</Text>

        <Text style={styles.label}>📦 Status:</Text>
        <Text style={[styles.statusBadge, getStatusStyle(order.status)]}>
          {order.status.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>🍽️ Ordered Items</Text>
      {order.items.map((item, index) => (
        <View key={index} style={styles.itemCard}>
          <Text style={styles.itemText}>
            {item.name} × {item.quantity}
          </Text>
          <Text style={styles.priceText}>₹{item.price * item.quantity}</Text>
        </View>
      ))}

      <Text style={styles.total}>💰 Total: ₹{total}</Text>

      <TouchableOpacity style={styles.button} onPress={handleRepeatOrder}>
        <Text style={styles.buttonText}>🔁 Repeat Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.outlineBtn]} onPress={handleDownloadReceipt}>
        <Text style={[styles.buttonText, styles.outlineText]}>📄 Download Receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  metadata: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
  },
  statusBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  badgePlaced: {
    backgroundColor: '#e3f2fd',
    color: '#2196f3',
  },
  badgePreparing: {
    backgroundColor: '#fff3cd',
    color: '#ff9800',
  },
  badgeDelivered: {
    backgroundColor: '#d4edda',
    color: '#388e3c',
  },
  badgeCancelled: {
    backgroundColor: '#f8d7da',
    color: '#d32f2f',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: COLORS.text,
  },
  itemCard: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
    color: COLORS.text,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: COLORS.accent,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.accent,
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  outlineText: {
    color: COLORS.accent,
  },
});

export default OrderDetailsScreen;
