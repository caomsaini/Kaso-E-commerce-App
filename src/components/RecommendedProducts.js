import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCart } from "./CartContext";
import CartScreen from './CartScreen';
import { useNavigation } from '@react-navigation/native';

const RecommendedProducts = ({
  products = [],
  onProductPress,
}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const [isCartVisible, setCartVisible] = useState(false);
  const navigation = useNavigation();

  const toggleCart = () => setCartVisible(!isCartVisible);

  

  // Handle FlatList scrolling
  const handleScroll = (direction) => {
    const offset = currentIndex + direction;
    if (offset >= 0 && offset < products.length) {
      setCurrentIndex(offset);
      flatListRef.current.scrollToIndex({ index: offset, animated: true });
    }
  };

  const handleAddToCart = (product) => {
    //setCartItems =((prev) => [...prev, product]);
    setCartVisible(true); // Open the cart drawer 
  };


  // Arrow Button States
  const isLeftDisabled = currentIndex === 0;
  const isRightDisabled = currentIndex === products.length - 1;

  // Render Product Card
  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      {/* Product Image */}
      <TouchableOpacity
        onPress={() => onProductPress(item)}
        style={styles.imageContainer}
      >
        <Image source={item.image} style={styles.productImage} />
      </TouchableOpacity>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹ {item.price.toFixed(2)}</Text>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          handleAddToCart(item);
        addToCart(item)}}
      >
        <Text style={styles.addToCartText}>+</Text>
      </TouchableOpacity>
      <CartScreen isVisible={isCartVisible} onClose={() => setCartVisible(false)}></CartScreen>
    </View>
  );

  return (
    <View style={styles.container}>
      {isCartVisible && (
        <View style={styles.overlay}>
          <CartScreen isVisible={isCartVisible} onClose={toggleCart} />
        </View>
      )}
      {/* Title and Arrow Buttons */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Pairs well with</Text>
        <View style={styles.arrows}>
          {/* Left Arrow */}
          <TouchableOpacity
            style={[styles.arrowButton, isLeftDisabled && styles.disabledArrow]}
            onPress={() => handleScroll(-1)}
            disabled={isLeftDisabled}
          >
            <Image
              source={require("../assets/minus-icon.png")} // Replace with your left arrow image
              style={styles.arrowImage}
            />
          </TouchableOpacity>
          {/* Right Arrow */}
          <TouchableOpacity
            style={[styles.arrowButton, isRightDisabled && styles.disabledArrow]}
            onPress={() => handleScroll(1)}
            disabled={isRightDisabled}
          >
            <Image
              source={require("../assets/plus-icon.png")} // Replace with your right arrow image
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product List */}
      <FlatList
        ref={flatListRef}
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  arrows: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 2,
    borderWidth: 0.5,
  },
  arrowImage: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  disabledArrow: {
    opacity: 0.3,
  },
  listContainer: {
    paddingVertical: 10,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginRight: 16,
    elevation: 2,
    width: 360, // Adjust card width
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingRight: 10,
  },
  productName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#000",
  },
  addToCartButton: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    backgroundColor: "#000",
    borderRadius: 20,
  },
  addToCartText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  
});

export default RecommendedProducts;
