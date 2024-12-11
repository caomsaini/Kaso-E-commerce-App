import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ColorSelectorSection = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Colors</Text>
      <View style={styles.colorContainer}>
        {product.colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorCircle,
              {
                backgroundColor: color,
                borderWidth: selectedColor === color ? 2 : 1,
                borderColor: selectedColor === color ? "#000" : "#ddd",
              },
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  colorContainer: { flexDirection: "row", flexWrap: "wrap" },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 8,
  },
});

export default ColorSelectorSection;
