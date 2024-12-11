import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const SearchModal = ({ isVisible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const [searchQuery, setSearchQuery] = useState('');
  const [typingText, setTypingText] = useState('');

  // Words to type
  const words = ['Earphones, Headphones, anythings', 'Search for...'];

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? screenHeight * 0.15 : screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (isVisible) {
      startTypingAnimation();
    } else {
      setTypingText(''); // Clear typing text when modal closes
    }
  }, [isVisible]);

  const startTypingAnimation = () => {
    let wordIndex = 0;
    let charIndex = 0;
    setTypingText('');

    const typeNextChar = () => {
      if (wordIndex < words.length) {
        const currentWord = words[wordIndex];

        if (charIndex < currentWord.length) {
          // Add one character at a time to the placeholder
          setTypingText(currentWord.slice(0, charIndex + 1));
          charIndex++;
          setTimeout(typeNextChar, 5); // Reduced typing speed for a very fast animation
        } else {
          // Pause briefly before moving to the next word
          charIndex = 0;
          wordIndex++;
          setTimeout(() => {
            if (wordIndex < words.length) {
              setTypingText(''); // Clear text before typing the next word
              setTimeout(typeNextChar, 20); // Short pause duration between words
            }
          }, 100); // Short pause before clearing and typing the next word
        }
      }
    };

    typeNextChar();
  };

  const handleOutsidePress = () => {
    onClose();
    Keyboard.dismiss();
  };

  return (
    isVisible && (
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.overlayTouchableArea} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}
        >
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.indicator} />
            <Text style={styles.title}>Search</Text>
            <View style={styles.fullWidthSeparator} />
            <View style={styles.content}>
              <TextInput
                style={styles.searchInput}
                placeholder={typingText}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#000"
              />
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>POPULAR CATEGORIES</Text>
                <View style={styles.separator} />
                <TouchableOpacity>
                  <Text style={styles.sectionItem}>Headphones</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.sectionItem}>Earphones</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.sectionItem}>Speakers</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.sectionItem}>Accessories</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionHeader}>INFO</Text>
                <View style={styles.separator} />
                <TouchableOpacity>
                  <Text style={styles.sectionItem}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.sectionItem}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.sectionItem}>FAQ's</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  overlayTouchableArea: { flex: 1 },
  modalContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '85%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
  },
  modalContent: { flex: 1 },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  fullWidthSeparator: {
    height: 0.7,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  searchInput: {
    height: 60,
    borderWidth: 0,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 30,
    marginTop: 20,
    fontSize: 16,
    backgroundColor: '#f7f7f7',
  },
  section: {
    marginBottom: 15,
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 7,
  },
  sectionItem: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 5,
    fontWeight: 'bold',
  },
});

export default SearchModal;
