import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../constants/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

interface Order {
  _id: string;
  items: { name: string; quantity: number; price: number }[];
  status: string;
  createdAt: string;
}

const MyOrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Unauthorized', 'Please login again.');
        setLoading(false);
        return;
      }

      const res = await axios.get('http://192.168.1.7:5000/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data.reverse());
    } catch (err: any) {
      Alert.alert('Failed to fetch orders', err.response?.data?.message || 'Try again');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId: string) => {
    Alert.alert('Confirm Cancel', 'Are you sure you want to cancel this order?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            if (!token) return;

            await axios.delete(`http://192.168.1.7:5000/api/orders/${orderId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            Alert.alert('Cancelled', 'Your order has been cancelled.');
            fetchOrders();
          } catch (err: any) {
            Alert.alert('Cancel Failed', err.response?.data?.message || 'Try again');
          }
        },
      },
    ]);
  };

  const isCancellable = (createdAt: string, status: string): boolean => {
    const createdTime = new Date(createdAt).getTime();
    const now = Date.now();
    const diffInMinutes = (now - createdTime) / (1000 * 60);
    return diffInMinutes <= 5 && status.toLowerCase() === 'placed';
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyle = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === 'placed') return styles.badgePlaced;
    if (lower === 'preparing') return styles.badgePreparing;
    if (lower === 'delivered') return styles.badgeDelivered;
    if (lower === 'cancelled') return styles.badgeCancelled;
    return {};
  };

  const renderOrder = ({ item, index }: { item: Order; index: number }) => {
    const total = item.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const canCancel = isCancellable(item.createdAt, item.status);
    const itemCount = item.items.reduce((sum, it) => sum + it.quantity, 0);

    return (
      <Animatable.View
        animation="fadeInUp"
        delay={index * 100}
        useNativeDriver
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('OrderDetails' as never, { order: item } as never)
          }
        >
          <View style={styles.card}>
            <Text style={styles.date}>
              🗓️ {new Date(item.createdAt).toLocaleString()}
            </Text>

            <Text style={styles.summary}>
              {itemCount} item{itemCount > 1 ? 's' : ''} • ₹{total}
            </Text>

            <View style={styles.badgeRow}>
              <Text style={[styles.statusBadge, getStatusStyle(item.status)]}>
                {item.status.toUpperCase()}
              </Text>
            </View>

            <View style={styles.itemsList}>
              {item.items.map((it, idx) => (
                <Text key={idx} style={styles.item}>
                  🍽️ {it.name} × {it.quantity}
                </Text>
              ))}
            </View>

            {canCancel ? (
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => handleCancel(item._id)}
              >
                <Text style={styles.cancelText}>❌ Cancel Order</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.nonCancellable}>
                ⏳ Cannot cancel after 5 mins
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" delay={100} style={styles.title}>
        My Orders
      </Animatable.Text>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.accent} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrder}
          ListEmptyComponent={
            <Animatable.Text
              animation="fadeIn"
              delay={300}
              style={styles.empty}
            >
              No orders found.
            </Animatable.Text>
          }
        />
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
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 4,
  },
  summary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  statusBadge: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
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
  itemsList: {
    marginTop: 6,
  },
  item: {
    fontSize: 14,
    color: COLORS.text,
  },
  cancelBtn: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontWeight: 'bold',
  },
  nonCancellable: {
    marginTop: 10,
    color: COLORS.gray,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 50,
    fontSize: 16,
  },
});

export default MyOrdersScreen;
