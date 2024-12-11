import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

const ImageZoomViewer = ({ images, onClose, initialIndex = 0 }) => {
  // Handle cases where `images` is empty or invalid
  if (!Array.isArray(images) || images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No images to display</Text>
      </View>
    );
  }

  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={require("../assets/close.png")} style={styles.closeIcon} />
        </TouchableOpacity>

        {/* Image Viewer */}
        <ImageViewer
          imageUrls={images}
          enableSwipeDown
          onSwipeDown={onClose}
          index={initialIndex} // Start from the selected image
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)" },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
  },
  closeIcon: { width: 24, height: 24, tintColor: "#fff" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ImageZoomViewer;
