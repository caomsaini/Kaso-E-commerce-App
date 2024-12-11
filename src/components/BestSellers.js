import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './CartContext'; // Import useCart
import CartScreen from './CartScreen';

// Product data with multiple color options
const products = [
  {
    id: 1,
    category: 'Headphones',
    isNew: true,
    //image: require('../assets/headphones.png'), // Add your image path 
    images: [
      require('../assets/headphones.png'),
      require('../assets/headphones1.png'),
      require('../assets/headphones2.png'),
    ],
    brand: 'SONICPULSE',
    name: 'Air Beats Black',
    price: 43000.0,
    rating: 5.0,
    colors: ['#F5A623', '#E94E77', '#6C63FF'], // Available colors
    recommendedProducts: [
      {
        id: 101,
        name: 'Gaming Headphones',
        price: 5000,
        image: require('../assets/gaming.png'),
      },
      {
        id: 102,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
      {
        id: 104,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
      {
        id: 105,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
      {
        id: 106,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
      {
        id: 107,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
      {
        id: 108,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
    ],
  },
  {
    id: 2,
    category: 'Earphones',
    isNew: false,
    //image: require('../assets/earphones.png'), // Add your image path
    images: [
      require('../assets/earphones.png'),
      require('../assets/earphones1.png'),
      require('../assets/earphones2.png'),
      require('../assets/earphones2.png'),
      require('../assets/earphones2.png'),
      require('../assets/earphones2.png'),
    ],
    brand: 'SOUNDWAVE',
    name: 'Wireless Bass Pods',
    price: 4000.0,
    rating: 4.5,
    colors: ['#000000', '#FFFFFF'], // Available colors
    recommendedProducts: [
      {
        id: 103,
        name: 'AirPods Max',
        price: 1000,
        image: require('../assets/headphoneswhite.png'),
      },
    ],
  },
  {
    id: 3,
    category: 'Headphones',
    isNew: true,
    //image: require('../assets/headphoneswhite.png'), // Add your image path
    images: [
      require('../assets/headphoneswhite.png'),
      require('../assets/headphoneswhite1.png'),
      require('../assets/headphoneswhite2.png'),
    ],
    brand: 'SONICPULSE',
    name: 'Air Beats Gold Tone',
    price: 43000.0,
    rating: 5.0,
    colors: ['#F5A623', '#E94E77', '#6C63FF'], // Available colors
    recommendedProducts: [
      {
        id: 101,
        name: 'Gaming Headphones',
        price: 5000,
        image: require('../assets/gaming.png'),
      },
      {
        id: 102,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
    ],
  },
  {
    id: 4,
    category: 'Headphones',
    isNew: true,
    image: 'No Image Available Product', // Add your image path
    brand: 'SONICPULSE',
    name: 'Air Beats Gold Tone',
    price: 43000.0,
    rating: 5.0,
    colors: ['#F5A623', '#E94E77', '#6C63FF'], // Available colors
    recommendedProducts: [
      {
        id: 101,
        name: 'Gaming Headphones',
        price: 5000,
        image: require('../assets/gaming.png'),
      },
      {
        id: 102,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
    ],
  },
  {
    id: 5,
    category: 'Earphones',
    isNew: false,
    image: require('../assets/earphones.png'), // Add your image path
    brand: 'SOUNDWAVE',
    name: 'Wireless Bass Pods',
    price: 15000.0,
    rating: 4.5,
    colors: ['#000000', '#FFFFFF'], // Available colors
    recommendedProducts: [
      {
        id: 101,
        name: 'Gaming Headphones',
        price: 5000,
        image: require('../assets/gaming.png'),
      },
      {
        id: 102,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
    ],
  },
  {
    id: 6,
    category: 'Earphones',
    isNew: false,
    image: require('../assets/earphones.png'), // Add your image path
    brand: 'SOUNDWAVE',
    name: 'Wireless Bass Pods',
    price: 15000.0,
    rating: 4.5,
    colors: ['#000000', '#FFFFFF'], // Available colors
    recommendedProducts: [
      {
        id: 101,
        name: 'Gaming Headphones',
        price: 5000,
        image: require('../assets/gaming.png'),
      },
      {
        id: 102,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
    ],
  },
  {
    id: 7,
    category: 'Earphones',
    isNew: false,
    image: require('../assets/earphones.png'), // Add your image path
    brand: 'SOUNDWAVE',
    name: 'Wireless Bass Pods',
    price: 15000.0,
    rating: 4.5,
    colors: ['#000000', '#FFFFFF'], // Available colors
    recommendedProducts: [
      {
        id: 101,
        name: 'Gaming Headphones',
        price: 5000,
        image: require('../assets/gaming.png'),
      },
      {
        id: 102,
        name: 'Bluetooth Speaker',
        price: 3000,
        image: require('../assets/speakers.png'),
      },
    ],
  },

  // Add more products as needed
];

const BestSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState('Headphones');
  const [isCartVisible, setCartVisible] = useState(false);
  const navigation = useNavigation();
  const { addToCart } = useCart(); // Get addToCart from context

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  const handleAddToCartAndOpenCart = (product) => {
    addToCart({ ...product, quantity: 1 }); // Add product to cart
    setCartVisible(true); // Open the cart screen drawer
  };

  const handleProductPress = (product) => {
    // Log the selected product to verify its images
    console.log("Selected Product: ", product);
    navigation.navigate('ProductDetailScreen', { product });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Best Sellers</Text>
      <View style={styles.tabs}>
        {['Headphones', 'Earphones', 'Speakers'].map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.tab,
              selectedCategory === category && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedCategory === category && styles.activeTabText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleProductPress(item)}
            >

            {item.isNew && <Text style={styles.newTag}>New</Text>}
            <Image 
               source={item.images && item.images.length > 0 ? item.images[0] : require('../assets/close.png')} 
                style={styles.productImage} 
              />

            <View style={styles.ratingContainer}>
              <Image
                source={require('../assets/star-icon.png')}
                style={styles.ratingStar}
              />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>
              <View style={styles.colorContainer}>
                {item.colors.map((color, index) => (
                  <View
                    key={index}
                    style={[styles.colorIndicator, { backgroundColor: color }]}
                  />
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => handleAddToCartAndOpenCart(item)}
            >
              <Image
                source={require('../assets/shopping-cart.png')}
                style={styles.cartImage}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <CartScreen
        isVisible={isCartVisible}
        onClose={() => setCartVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 22,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
  },
  horizontalList: {
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 24,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    width: 220,
    position: 'relative',
    elevation: 2,
  },
  newTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'green',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
    zIndex: 1,
  },
  productImage: {
    width: '100%',
    height: 230,
    resizeMode: 'contain',
  },
  ratingContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  ratingStar: {
    width: 14,
    height: 14,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#000',
  },
  details: {
    padding: 16,
  },
  brand: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  colorContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cartButton: {
    position: 'absolute',
    bottom: 120,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 10,
  },
  cartImage: {
    width: 24,
    height: 24,
  },
});

export default BestSellers;
