import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const Button = ({ title, icon, onPress, background = '#232326' }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: background }}
      onPress={onPress}
    >
      {icon && icon}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
