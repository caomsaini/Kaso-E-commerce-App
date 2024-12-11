// src/components/VideoBanner.js

import React from 'react';
import Video from 'react-native-video';
import { StyleSheet, View } from 'react-native';

const VideoBanner = ({ videoSource }) => {
  return (
    <View style={styles.videoContainer}>
      <Video
        source={videoSource}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height: 200, // Adjust height as needed
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default VideoBanner;
