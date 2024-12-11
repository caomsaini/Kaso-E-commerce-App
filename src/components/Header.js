// Header.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ toggleDrawer, toggleSearch, toggleCart }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image source={require('../assets/menu_icon1.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <Image source={require('../assets/kaso_black_transparant.png')} style={styles.logo} />
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={toggleSearch}>
          <Image source={require('../assets/search_icon.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCart}>
          <Image source={require('../assets/cart_icon.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    elevation: 5,
  },
  menuIcon: { width: 28, height: 28, resizeMode: 'contain' },
  logo: { width: 100, height: 30, marginLeft: 5, resizeMode: 'contain' },
  headerIcons: { flexDirection: 'row', marginLeft: 'auto', alignItems: 'center' },
  headerIcon: { width: 24, height: 24, marginLeft: 15, resizeMode: 'contain' },
});

export default Header;
