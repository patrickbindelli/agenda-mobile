import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const FakeProfilePicture = ({ size = 40, backgroundColor = '#2E2E32' }) => {
  return (
    <View
      style={{
        ...styles.container,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
      }}
    >
      <MaterialIcons name="person" size={size - 5} color="white" />
    </View>
  );
};

export default FakeProfilePicture;
