import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ColorSelectorSection = ({ product, onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Default to the first color

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (onColorChange) {
      onColorChange(color); // Notify the parent of the selected color
    }
  };

  return (
    <View style={styles.colorSelector}>
      {selectedColor && (
        <Text style={styles.colorTitle}>Color: {selectedColor}</Text>
      )}
        <View style={styles.colorOptions}>
          {product.colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorOption,
                { backgroundColor: color,
                  borderWidth: selectedColor === color ? 3 : 1,
                borderColor: selectedColor === color ? "#000" : "#ddd",
                transform: selectedColor === color ? [{ scale: 1.2 }] : [{ scale: 1 }],
               },
                //selectedColor.name === index && styles.colorOptionSelected,
              ]}
              onPress={() => handleColorSelect(color)}
            />
          ))}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  colorSelector: {
    padding: 16,
  },
  colorTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorOption: {
    width: 18,
    height: 18,
    borderRadius: 10,
    marginRight: 8,
  },
  colorOptionSelected: {
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default ColorSelectorSection;
