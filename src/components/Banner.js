// src/components/Banner.js

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Banner = ({ source }) => {
  return (
    <View style={styles.bannerContainer}>
      <Image source={source} style={styles.bannerImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 200, // Adjust height based on design
    resizeMode: 'cover',
  },
});

export default Banner;
