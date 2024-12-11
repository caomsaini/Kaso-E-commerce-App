import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useCart } from "./CartContext";
import ImageZoomViewer from "./ImageZoomViewer";

const ModelName = () => {
  const [isZoomVisible, setZoomVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false); // To manage floating popup visibility
  const { addToCart } = useCart();
  const route = useRoute();
  const { product } = route.params;

  const screenWidth = Dimensions.get("window").width;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowPopup(offsetY > 400); // Show popup after scrolling 400px
  };

  return (
    <View style={styles.container}>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        {/* Product Image Carousel */}
        <FlatList
          data={product.images || []}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setZoomVisible(true)}>
              <Image source={item.url} style={[styles.productImage, { width: screenWidth }]} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Modal visible={isZoomVisible} transparent={true}>
          <ImageZoomViewer
            images={product.images.map((image) => ({ url: image.url }))}
            onClose={() => setZoomVisible(false)}
          />
        </Modal>

        {/* Color Selection */}
        <Text style={styles.sectionTitle}>Available Colors</Text>
        <FlatList
          data={product.colors}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.colorCircle,
                {
                  backgroundColor: item,
                  borderWidth: selectedColor === item ? 2 : 1,
                  borderColor: selectedColor === item ? "#000" : "#ddd",
                },
              ]}
              onPress={() => setSelectedColor(item)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Quantity and Add to Cart */}
        <View style={styles.actions}>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
              <Image
                source={require("../assets/minus-icon.png")}
                style={styles.quantityButtonImage}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
              <Image
                source={require("../assets/plus-icon.png")}
                style={styles.quantityButtonImage}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => addToCart({ ...product, quantity })}
          >
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productBrand}>Brand: {product.brand}</Text>
          <Text style={styles.productPrice}>Price: ₹{product.price.toFixed(2)}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>

        {/* Recommendations */}
        <Text style={styles.sectionTitle}>Recommended Products</Text>
        <FlatList
          data={product.recommendations}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.recommendationCard}>
              <Image source={item.image} style={styles.recommendationImage} />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      {/* Floating Popup */}
      {showPopup && (
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>{product.name}</Text>
          <Text style={styles.popupPrice}>₹{product.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.popupCartButton}
            onPress={() => addToCart({ ...product, quantity })}
          >
            <Text style={styles.popupCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  productImage: { height: 300, resizeMode: "contain" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginHorizontal: 20, marginVertical: 8 },
  colorCircle: { width: 30, height: 30, borderRadius: 15, margin: 8 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginVertical: 16 },
  quantityControl: { flexDirection: "row", alignItems: "center" },
  quantityButton: { padding: 10 },
  quantityButtonImage: { width: 30, height: 30, resizeMode: "contain" },
  quantityText: { marginHorizontal: 10, fontSize: 16 },
  cartButton: { padding: 16, backgroundColor: "#000", borderRadius: 8, flex: 1, marginLeft: 8 },
  cartButtonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  productDetails: { padding: 16 },
  productTitle: { fontSize: 22, fontWeight: "bold" },
  productBrand: { fontSize: 16, color: "#555" },
  productPrice: { fontSize: 18, color: "green", marginVertical: 8 },
  productDescription: { fontSize: 14, color: "#333" },
  recommendationCard: { marginRight: 16, alignItems: "center" },
  recommendationImage: { width: 80, height: 80, resizeMode: "contain" },
  popup: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  popupTitle: { flex: 1, fontSize: 16, fontWeight: "bold" },
  popupPrice: { fontSize: 16, color: "green" },
  popupCartButton: { backgroundColor: "#000", padding: 8, borderRadius: 5 },
  popupCartButtonText: { color: "#fff", fontWeight: "bold" },
});

export default ModelName;
