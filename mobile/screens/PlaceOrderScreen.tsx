import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';

const menuItems = [
  { id: '1', name: 'Pizza', price: 300, quantity: 0, image: require('../assets/images/pizza.png') },
  { id: '2', name: 'Burger', price: 150, quantity: 0, image: require('../assets/images/burger.png') },
  { id: '3', name: 'Fries', price: 100, quantity: 0, image: require('../assets/images/fries.png') },
  { id: '4', name: 'Pasta', price: 220, quantity: 0, image: require('../assets/images/pasta.png') },
  { id: '5', name: 'Wraps', price: 180, quantity: 0, image: require('../assets/images/wrap.png') },
  { id: '6', name: 'Sandwich', price: 140, quantity: 0, image: require('../assets/images/sandwich.png') },
  { id: '7', name: 'Ice Cream', price: 90, quantity: 0, image: require('../assets/images/icecream.png') },
  { id: '8', name: 'Coke', price: 60, quantity: 0, image: require('../assets/images/coke.png') },
];

const PlaceOrderScreen = () => {
  const [menu, setMenu] = useState(menuItems);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const { addToCart } = useCart();

  const updateQuantity = (id: string, change: number) => {
    setMenu((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const handleAddToCart = () => {
    const selectedItems = menu.filter((item) => item.quantity > 0);

    if (selectedItems.length === 0) {
      Alert.alert('No items', 'Please add at least one item.');
      return;
    }

    selectedItems.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
    });

    setMenu(menu.map((item) => ({ ...item, quantity: 0 })));

    Alert.alert('Added to Cart', 'Items have been added to your cart.');
    navigation.navigate('Cart' as never);
  };

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: typeof menuItems[0] }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <View style={styles.qtyRow}>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, -1)}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, 1)}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍔 Choose Your Delights</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        placeholderTextColor={COLORS.gray}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredMenu}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No matching items found.</Text>
        }
      />

      <CustomButton title="Add to Cart" onPress={handleAddToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  price: {
    fontSize: 14,
    color: COLORS.gray,
    marginVertical: 6,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qtyBtnText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
  qty: {
    fontSize: 16,
    color: COLORS.text,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default PlaceOrderScreen;
