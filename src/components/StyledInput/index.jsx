import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Separator } from "../Separator";

const StyledInput = ({ title, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={isFocused ? { ...styles.inputOnFocus } : { ...styles.input }}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        selectionColor={"#6E56CF"}
        placeholder={title}
        placeholderTextColor={"#A09FA6"}
      />
      <Separator color={isFocused ? "#6E56CF" : "#34343A"} />
    </View>
  );
};

export default StyledInput;
