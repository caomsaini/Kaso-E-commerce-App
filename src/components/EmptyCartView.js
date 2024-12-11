import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const EmptyCartView = ({ categories }) => {
  return (
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
};

const styles = StyleSheet.create({
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
});

export default EmptyCartView;
