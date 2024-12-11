import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import ProductCarousel from '../components/ProductCarousel';
import ColorSelectorSection from '../components/ColorSelectorSection';
import QuantitySelector from '../components/QuantitySelector';
import ProductDetailScreen from '../components/ProductDetailScreen';

const modelName = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Product Image Carousel */}
      <ProductCarousel />

      {/* Product Details Section */}
      <ProductDetailScreen />

      {/* Color Selector */}
      <ColorSelectorSection />

      {/* Quantity Selector */}
      <QuantitySelector />

      {/* Buttons for Add to Cart and Buy Now */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy It Now</Text>
        </TouchableOpacity>
      </View>

      {/* Recommended Products */}
      <View style={styles.recommendedSection}>
        <Text style={styles.recommendedTitle}>Recommended Products</Text>
        {/* Recommended products will go here */}
      </View>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  addToCartButton: {
    backgroundColor: '#000',
    flex: 1,
    marginRight: 10,
    padding: 15,
    borderRadius: 5,
  },
  buyNowButton: {
    backgroundColor: '#28a745',
    flex: 1,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendedSection: {
    marginTop: 30,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shareButton: {
    marginTop: 20,
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  shareText: {
    fontSize: 16,
    color: '#000',
  },
});

export default modelName;
