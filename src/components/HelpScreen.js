import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HelpScreen = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Need Help?</Text>
        
        {/* Instructions or Help Content */}
        <View style={styles.helpContent}>
          <Text style={styles.helpText}>
            Here are some common questions and answers about the product:
          </Text>
          
          <Text style={styles.question}>1. How to use the product?</Text>
          <Text style={styles.answer}>To use the product, simply ...</Text>
          
          <Text style={styles.question}>2. How to return the product?</Text>
          <Text style={styles.answer}>Returns are accepted within ...</Text>

          <Text style={styles.question}>3. What is the warranty period?</Text>
          <Text style={styles.answer}>The warranty lasts for ...</Text>

          {/* Add more help or FAQ sections */}
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  helpContent: {
    marginBottom: 30,
  },
  helpText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#f5a623',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HelpScreen;
