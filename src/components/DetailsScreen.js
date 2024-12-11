// src/components/DetailsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Product Details</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 16, fontWeight: "bold" },
});

export default DetailsScreen;

// Repeat similar structure for SpecificationsScreen.js, ReviewsScreen.js, and FAQsScreen.js
