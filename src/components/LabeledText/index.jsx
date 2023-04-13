import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export const LabeledText = ({ title, text }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default LabeledText;
