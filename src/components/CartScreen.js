import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "./CartContext";

const CartScreen = ({ isVisible, onClose }) => {
  const { cartItems, addToCart, decreaseQuantity } = useCart();
  const slideAnim = useRef(new Animated.Value(500)).current; // Initial position (off-screen)
  const insets = useSafeAreaInsets();

  const categories = [
    { name: "Headphones", icon: require("../assets/headphones-icon.png") },
    { name: "Earphones", icon: require("../assets/earphones-icon.png") },
    { name: "Speakers", icon: require("../assets/speakers-icon.png") },
    { name: "Accessories", icon: require("../assets/accessories-icon.png") },
  ];

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 500, // Slide in or out
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  // Calculate the total price
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Dynamic discount logic
  const calculateDiscount = () => {
    // Example logic: 10% discount if total exceeds 5000, otherwise no discount
    const total = calculateTotal();
    return total > 5000 ? total * 0.1 : 0;
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={typeof item.image === "string" ? { uri: item.image } : item.image}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPrice}>₹ {item.price}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item.id)}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => addToCart(item)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Cart</Text>
      {cartItems.length > 0 && ( // Show badge only if cart has items
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
      </View>
      )}
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContent}>
      <Text style={styles.emptyCartTitle}>Your cart is currently empty.</Text>
      <Text style={styles.emptyCartSubtitle}>
        Not sure where to start?{"\n"}Try these collections:
      </Text>
      <View style={styles.categoryButtons}>
        {categories.map((category) => (
          <TouchableOpacity key={category.name} style={styles.categoryButton}>
            <View style={styles.categoryButtonContent}>
              <Image source={category.icon} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderFooter = () => {
    const discount = calculateDiscount();
    const subtotal = calculateTotal();
    const finalTotal = subtotal - discount;

    return (
      <View style={styles.footer}>
        <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order Discount</Text>
            <Text style={styles.discountText}>₹ -{discount.toFixed(2)}</Text>
          </View>
                    
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Order Total:</Text>
            <Text style={styles.totalValue}>₹ {finalTotal.toFixed(2)}</Text>
          </View>
          <Text style={styles.summaryText}>
            Taxes included and shipping calculated at checkout.
          </Text>
        </View>
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Check Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return !isVisible ? null : (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.drawer,
              { transform: [{ translateY: slideAnim }], paddingBottom: insets.bottom },
            ]}
          >
            <SafeAreaView style={styles.container}>
            <View style={styles.indicator} />
              {renderHeader()}
              {cartItems.length === 0 ? (
                renderEmptyCart() // Render the empty cart design
              ) : (
                <>
                  <FlatList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.cartList}
                  />
                  {renderFooter()}
                </>
              )}
            </SafeAreaView>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  
  drawer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "85%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
  emptyCartContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginBottom: 60,
  },
  emptyCartTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  categoryButtons: {
    width: "100%",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  categoryButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 18,
  },
  arrow: {
    fontSize: 28,
    color: "#000",
  },
  cartItem: {
    flexDirection: "row",
    marginVertical: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#000",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold'
    
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "top",
    //justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cartBadge: {
    //backgroundColor: "red",
    //borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "top",
    alignItems: "left",
    marginLeft: 3,
  },
  cartBadgeText: {
    color: "red",
    fontSize: 14,
    //fontWeight: "bold",
  },
  summaryContainer: {
   // paddingVertical: 15,
   // borderTopWidth: 1,
   // borderTopColor: "#eee",
    //marginBottom: 20,
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  discountText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
  summaryText: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },
  summaryValue: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
