import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Share } from "react-native";

const ShareAndHelp = ({ product }) => {
  const [isHelpVisible, setHelpVisible] = useState(false); // For displaying the help modal

  // Function to handle sharing the product
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${product.name}\nPrice: ₹${product.price.toFixed(2)}\n${product.description}`,
      });
    } catch (error) {
      console.error("Error sharing product:", error.message);
    }
  };

  // Function to handle opening the help modal
  const handleHelp = () => {
    setHelpVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>

      {/* Help Button */}
      <TouchableOpacity style={styles.helpButton} onPress={handleHelp}>
        <Text style={styles.buttonText}>Need Help</Text>
      </TouchableOpacity>

      {/* Help Modal */}
      <Modal
        visible={isHelpVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setHelpVisible(false)}
      >
        <View style={styles.helpModal}>
          <Text style={styles.helpTitle}>Need Help</Text>
          <Text style={styles.helpText}>
            Here are some instructions on how to use the product and troubleshoot.
          </Text>
          <TouchableOpacity
            style={styles.closeHelpButton}
            onPress={() => setHelpVisible(false)}
          >
            <Text style={styles.closeHelpButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  shareButton: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  helpButton: {
    backgroundColor: "#f5a623",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  helpModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
  },
  helpTitle: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20,
  },
  helpText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  closeHelpButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
  },
  closeHelpButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ShareAndHelp;
