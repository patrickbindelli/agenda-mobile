import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export const LabeledText = ({ title, text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default LabeledText;
