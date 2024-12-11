// MenuDrawer.js
import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  SafeAreaView,
  Linking,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MenuDrawer = ({ isVisible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current; // Start off-screen

  // Slide animation for opening and closing the drawer
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? screenHeight * 0.0 : screenHeight, // 15% of the height when visible
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  // Handle social media link opening
  const openSocialLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('Error opening link:', err)
    );
  };

  if (!isVisible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.drawer, { transform: [{ translateY: slideAnim }] }]}
          >
            <SafeAreaView style={styles.drawerContent}>
              {/* Top Line Indicator */}
              <View style={styles.indicator} />

              {/* Menu Items */}
              <View style={styles.menuItemsContainer}>
                <Text style={styles.drawerItem}>Shop</Text>
                <Text style={styles.drawerItem}>Collections</Text>
                <Text style={styles.drawerItem}>Explore</Text>
                <Text style={styles.drawerItem}>Contact</Text>
                <Text style={styles.drawerItem}>Theme features</Text>
              </View>

              {/* Bottom Row */}
              <View style={styles.bottomRow}>
                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton}>
                  <Image
                    source={require('../assets/account_icon.png')}
                    style={styles.loginIcon}
                  />
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                {/* Social Icons */}
                <View style={styles.socialIcons}>
                  <TouchableOpacity
                    onPress={() =>
                      openSocialLink('https://www.facebook.com/KasoIndia')
                    }
                  >
                    <Image
                      source={require('../assets/facebook_icon.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      openSocialLink('https://x.com/KasoIndia')
                    }
                  >
                    <Image
                      source={require('../assets/twitter_icon.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      openSocialLink('https://www.instagram.com/KasoIndia')
                    }
                  >
                    <Image
                      source={require('../assets/instagram_icon.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      openSocialLink('https://www.youtube.com/@kasoindia')
                    }
                  >
                    <Image
                      source={require('../assets/youtube_icon.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '85%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  drawerContent: {
    flex: 1,
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  menuItemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f6f6f6',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
  },
  loginIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginRight: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
});

export default MenuDrawer;
