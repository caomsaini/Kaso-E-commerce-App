import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

const SlidingDrawer = ({ isVisible, onClose, content }) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={onClose}
    style={{ justifyContent: 'flex-end', margin: 0 }}
  >
    <View
      style={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
      }}
    >
      {content}
    </View>
  </Modal>
);

export default SlidingDrawer;
