import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCarousel = ({ images/*, onImagePress*/ }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const validImages = images && images.length > 0 ? images : [require('../assets/close.png')];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setActiveIndex(index);
        }}
        showsHorizontalScrollIndicator={false}
      >
       {validImages.map((image, index) => (
     <Image
     key={index}
     source={typeof image === 'string' ? { uri: image } : image} // Handle remote and local images
     style={styles.image}
   />
 ))}
  </ScrollView>
      <View style={styles.pagination}>
        {validImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative', height: 300 },
  image: { width: '100%', height: 300, resizeMode: 'contain' },
  pagination: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  dot: { height: 8, width: 8, borderRadius: 4, backgroundColor: 'gray', margin: 4 },
  activeDot: { backgroundColor: 'black' },
});

export default ProductCarousel;
