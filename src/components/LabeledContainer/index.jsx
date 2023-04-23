import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

export const LabeledContainer = ({ label, icon, onIconPress, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.text}>{label}</Text>
        {icon && <TouchableOpacity onPress={onIconPress}>{icon}</TouchableOpacity>}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};
