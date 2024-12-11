import React from 'react';
import { View, TouchableOpacity, Image, Text, Animated, StyleSheet } from 'react-native';

const BottomNavigation = ({ navigation, scrollY }) => {
  return (
    <Animated.View
      style={[
        styles.bottomNav,
        {
          transform: [
            {
              translateY: scrollY?.interpolate({
                inputRange: [0, 100],
                outputRange: [100, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
        <Text style={styles.navLabel}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Menu')}>
        <Image source={require('../assets/chat.png')} style={styles.navIcon} />
        <Text style={styles.navLabel}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Search')}>
        <Image source={require('../assets/search_icon.png')} style={styles.navIcon} />
        <Text style={styles.navLabel}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Shop')}>
        <Image source={require('../assets/shop_icon2.png')} style={styles.navIcon} />
        <Text style={styles.navLabel}>Shop</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
        <Image source={require('../assets/cart_icon.png')} style={styles.navIcon} />
        <Text style={styles.navLabel}>Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Account')}>
        <Image source={require('../assets/account_icon.png')} style={styles.navIcon} />
        <Text style={styles.navLabel}>Account</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  navLabel: {
    fontSize: 12,
    color: '#333',
  },
});

export default BottomNavigation;
