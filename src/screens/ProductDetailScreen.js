// src/screens/ProductDetailScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Button, Modal, Animated } from 'react-native';
import ProductCarousel from '../components/ProductCarousel';
import ColorSelectorSection from '../components/ColorSelectorSection';
import QuantitySelector from '../components/QuantitySelector';
import FloatingPopup from '../components/FloatingPopup';
import RecommendedProducts from '../components/RecommendedProducts';
import VideoSection from '../components/VideoSection';
import ShareAndHelp from '../components/ShareAndHelp';
import HelpScreen from '../components/HelpScreen';
import BottomNavigation from '../components/BottomNavigation'; // ✅ Import BottomNavigation
import { useRoute, useNavigation } from '@react-navigation/native'; // ✅ Use navigation to pass it to BottomNavigation

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // ✅ Get navigation prop
  const { product } = route.params || {};
  const [showPopup, setShowPopup] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const scrollPosition = useRef(new Animated.Value(0)).current; // ✅ Track scroll position

  useEffect(() => {
    // Clean up timeout on unmount
    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  /**
   * Handle scroll event to show/hide the Floating Popup
   */
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Show the floating popup after 300px
    if (scrollY > 300) {
      if (!showPopup) setShowPopup(true);
    } else {
      setShowPopup(false);
    }

    // Clear any existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Hide popup 10 seconds after scrolling stops
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 1000000);

    setScrollTimeout(timeout);
  };

  /**
   * Combined onScroll function to manage scroll position and event handling
   */
  const onScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    scrollPosition.setValue(scrollY); // Update scroll position for Animated
    handleScroll(event); // Call the handleScroll function
  };

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 18, color: '#888' }}>
          Product details not available.
        </Text>
      </View>
    );
  }

  const [isHelpVisible, setHelpVisible] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    console.log('Selected Quantity:', newQuantity);
  };

  const handleAddToCart = (item) => {
    console.log(`${item.name} added to cart`);
  };

  const handleViewDetails = (productId) => {
    console.log('View details for product:', productId);
    navigation.navigate('ProductDetails', { productId });
  };

  const showHelp = () => {
    setHelpVisible(true);
  };

  const hideHelp = () => {
    setHelpVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        onScroll={onScroll} // ✅ Call the combined onScroll function
        scrollEventThrottle={16}
      >
        <ProductCarousel images={product.images || []} />

        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productBrand}>Brand: {product.brand}</Text>
          <Text style={styles.productPrice}>₹ {product.price.toFixed(2)}</Text>
          <Text style={styles.productRating}>Rating: {product.rating} ★</Text>
        </View>

        <ColorSelectorSection product={product} />

        <QuantitySelector onQuantityChange={handleQuantityChange} />

        <RecommendedProducts
          products={product.recommendedProducts || []}
          onProductPress={(selectedProduct) =>
            navigation.navigate('ProductDetailScreen', { product: selectedProduct })
          }
          onAddToCart={(item) => handleAddToCart(item)}
        />

        <VideoSection videoUrl={product.videoUrl} productName={product.name} />

        <ShareAndHelp product={product} />

        <View style={styles.page}>
          <Text style={styles.text}>Product Detail Page - Page 1</Text>
        </View>

        <View style={styles.page}>
          <Text style={styles.text}>Product Detail Page - Page 2</Text>
        </View>
      </ScrollView>

      {showPopup && (
        <FloatingPopup
          product={product}
          onAddToCart={handleAddToCart}
         /* onViewDetails={() => handleViewDetails(product.id)}*/
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} scrollY={scrollPosition} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productBrand: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    color: 'green',
    marginBottom: 8,
  },
  productRating: {
    fontSize: 14,
    color: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  page: {
    height: 600, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default ProductDetailScreen;
