import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const FloatingPopup = ({ product, onAddToCart, /*onViewDetails*/ }) => {
  if (!product) return null;

  return (
    <View style={styles.popupContainer}>
      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Image source={product.image} style={styles.productImage} />
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>₹ {product.price.toFixed(2)}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        {/*<TouchableOpacity style={styles.detailsButton} onPress={() => onViewDetails(product.id)}>
          <Text style={styles.detailsButtonText}>View</Text>
        </TouchableOpacity>*/}
        <TouchableOpacity style={styles.cartButton} onPress={() => onAddToCart(product.id)}>
          <Image
                source={require('../assets/shopping-cart.png')}
                style={styles.cartImage}
              />
        </TouchableOpacity>
        </View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    bottom: 60,
    left: 2,
    right: 2  ,
    backgroundColor: "#fff7f6",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,  
    elevation: 5,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 3,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  cartButton: {
    //backgroundColor: "#FF0000",
    borderRadius: 30,
    padding: 10,
  },
  cartButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  cartImage: {
    width: 30,
    height: 30,
  },
});

export default FloatingPopup;
