// HomeScreen.js

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import MenuDrawer from './MenuDrawer';
import SearchModal from './SearchModal';
import CartScreen from './CartScreen';
import BestSellers from './BestSellers';
import ShopbyCategories from './ShopbyCategories'; 
import Carousel from 'react-native-reanimated-carousel';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import Header from './Header'; // Import the new Header component

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const banners = [
  {
    image: require('../assets/HP_Banner_1.png'),
    title: 'EXPERIENCE UNPARALLELED AUDIO ELEGANCE',
    buttonLabel: 'Shop Headphones',
  },
  {
    image: require('../assets/HP_Banner_2.png'),
    title: 'YOUR SOUND, YOUR STYLE',
    buttonLabel: 'Discover More',
  },
  {
    type: 'video',
    source: require('../assets/HP_VideoBanner_3.mp4'),
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => setDrawerVisible(!isDrawerVisible);
  const toggleSearch = () => setSearchVisible(!isSearchVisible);
  const toggleCart = () => setCartVisible(!isCartVisible);

  const renderBanner = ({ item }) => {
    if (item.type === 'video') {
      return (
        <Video
          source={item.source}
          style={styles.videoBanner}
          resizeMode="cover"
          repeat
          muted
        />
      );
    }
    return (
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.bannerImage} />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => navigation.navigate('Shop')}
          >
            <Text style={styles.bannerButtonText}>{item.buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Use the Header Component */}
      <Header toggleDrawer={toggleDrawer} toggleSearch={toggleSearch} toggleCart={toggleCart} />

      {/* Sliding Drawer */}
      {isDrawerVisible && (
        <View style={styles.overlay}>
          <MenuDrawer isVisible={isDrawerVisible} onClose={toggleDrawer} />
        </View>
      )}

      {/* Search Modal */}
      {isSearchVisible && (
        <View style={styles.overlay}>
          <SearchModal isVisible={isSearchVisible} onClose={toggleSearch} />
        </View>
      )}

      {/* Cart Screen */}
      {isCartVisible && (
        <View style={styles.overlay}>
          <CartScreen isVisible={isCartVisible} onClose={toggleCart} />
        </View>
      )}

      {/* Main Scrollable Content */}
      <ScrollView
        onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        {/* Carousel Banner Section */}
        <View style={styles.bannerContainer}>
          <Carousel
            width={screenWidth}
            height={screenHeight * 0.4}
            data={banners}
            renderItem={renderBanner}
            autoPlay
            autoPlayInterval={10000}
            loop
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <View style={styles.pagination}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, { opacity: index === activeSlide ? 1 : 0.3 }]}
              />
            ))}
          </View>
        </View>

        {/* Product Categories Section */}
        <ShopbyCategories />
        <BestSellers />
        
        {/* Brand Story Section */}
        <View style={styles.brandStoryContainer}>
          <Text style={styles.storyTitle}>We believe in the power of sound</Text>
          <Text style={styles.storyTitle}>Our Story</Text>
          <Text style={styles.storyContent}>
            Discover our commitment to bringing you the best in sound technology. Our brand combines elegance with cutting-edge audio solutions for an unmatched listening experience.
          </Text>
          <Image source={require('../assets/brand_story_image.png')} style={styles.storyImage} />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} scrollY={scrollY} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bannerContainer: { flex: 1 },
  carouselItem: { borderRadius: 10, overflow: 'hidden', position: 'relative' },
  bannerImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  bannerTextContainer: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  bannerButton: { backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25 },
  bannerButtonText: { color: '#000', fontWeight: 'bold' },
  videoBanner: { width: screenWidth, height: screenHeight * 0.4, resizeMode: 'cover' },
  pagination: { position: 'absolute', bottom: 10, alignSelf: 'center', flexDirection: 'row' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff', marginHorizontal: 3 },
  brandStoryContainer: { padding: 20 },
  storyTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  storyContent: { fontSize: 16, color: '#555', marginBottom: 15 },
  storyImage: { width: '100%', height: 200, borderRadius: 10 },
  
});

export default HomeScreen;
