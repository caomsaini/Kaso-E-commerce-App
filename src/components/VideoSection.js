import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Video from "react-native-video";

const VideoSection = ({ videoUrl, productName }) => {
  return (
    <View style={styles.container}>
      {/* Video Player */}
      <Video
        source={{ uri: videoUrl }} // The video URL will be passed as a prop
        style={styles.videoPlayer}
        controls={true} // Enables video controls (play, pause, volume, etc.)
        resizeMode="contain" // Ensures video scales properly within its container
      />
      {/* Video Overlay Text */}
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          Watch to learn more about {productName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 300,
    marginTop: 20,
  },
  videoPlayer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 8,
  },
  overlayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VideoSection;
