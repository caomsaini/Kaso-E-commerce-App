// src/components/ProductDetailScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import ProductCarousel from './ProductCarousel'; // Import the carousel component

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;  // Get the product data passed via navigation
  const [quantity, setQuantity] = useState(1);  // Handle product quantity

  // Handle color change (this assumes product.colors is an array of color options)
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <ScrollView style={styles.container}>
      {/* Product Image Carousel */}
      <ProductCarousel product={product} />

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Rs. {product.price.toFixed(2)}</Text>
        <Text style={styles.rating}>Rating: {product.rating} ★</Text>
      </View>

      {/* Color Options */}
      <View style={styles.colorOptions}>
        <Text>Available Colors:</Text>
        <View style={styles.colors}>
          {product.colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.color, { backgroundColor: color }]}
              onPress={() => setSelectedColor(color)}  // Update the selected color
            />
          ))}
        </View>
        <Text style={styles.selectedColor}>Selected Color: {selectedColor}</Text>
      </View>

      {/* Quantity Selector */}
      <View style={styles.quantitySelector}>
        <Text>Quantity:</Text>
        <Button title="-" onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} />
        <Text>{quantity}</Text>
        <Button title="+" onPress={() => setQuantity(quantity + 1)} />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button title="Add to Cart" onPress={() => {}} />
        <Button title="Buy Now" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productDetails: {
    marginTop: 20,
  },
  brand: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#000',
  },
  colorOptions: {
    marginTop: 20,
  },
  colors: {
    flexDirection: 'row',
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  selectedColor: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
  },
  quantitySelector: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductDetailScreen;
