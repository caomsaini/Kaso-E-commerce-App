// ProductCategory.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ShopbyCategories = () => {
  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.categoryTitle}>Shop by Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.categoryItem}>
          <Image source={require('../assets/headphones.png')} style={styles.categoryImage} />
          <Text>Headphones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image source={require('../assets/earphones.png')} style={styles.categoryImage} />
          <Text>Earphones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image source={require('../assets/speakers.png')} style={styles.categoryImage} />
          <Text>Speakers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image source={require('../assets/accessories.png')} style={styles.categoryImage} />
          <Text>Accessories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image source={require('../assets/wireless.png')} style={styles.categoryImage} />
          <Text>Wireless</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image source={require('../assets/gaming.png')} style={styles.categoryImage} />
          <Text>Gaming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image source={require('../assets/limited.png')} style={styles.categoryImage} />
          <Text>Limited</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Image source={require('../assets/phone-charger.png')} style={styles.categoryImage} />
          <Text>Charger</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: { padding: 20 },
  categoryTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  categoryItem: { alignItems: 'center', marginRight: 15 },
  categoryImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 5 },
});

export default ShopbyCategories;
