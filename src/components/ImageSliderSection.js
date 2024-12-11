import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
} from "react-native";
import ImageZoomViewer from "./ImageZoomViewer";

const ImageSliderSection = ({ product }) => {
  const [isZoomVisible, setZoomVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const images = product.images || [];

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setZoomVisible(true)}>
            <Image
              source={{ uri: item.url }}
              style={[styles.productImage, { width: screenWidth }]}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Full-Screen Zoom Viewer */}
      <Modal visible={isZoomVisible} transparent={true}>
        <ImageZoomViewer
          isVisible={isZoomVisible}
          onClose={() => setZoomVisible(false)}
          images={images.map((image) => ({ url: image.url }))}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  productImage: { height: 300, resizeMode: "contain" },
});

export default ImageSliderSection;
