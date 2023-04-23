import React from 'react';
import { View } from 'react-native';

import styles from './styles';

export const Separator = ({ color = '#34343A' }) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: color,
      }}
    />
  );
};
