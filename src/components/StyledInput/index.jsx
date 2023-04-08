import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Separator } from "../Separator";

const StyledInput = ({
  title,
  value,
  onChangeText,
  icon,
  onSubmit,
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={
            isFocused
              ? {
                  ...styles.inputOnFocus,
                  color: editable ? "#A09FA6" : "#4C5155",
                }
              : { ...styles.input, color: editable ? "#A09FA6" : "#4C5155" }
          }
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          selectionColor={"#6E56CF"}
          placeholder={title}
          placeholderTextColor={editable ? "#A09FA6" : "#4C5155"}
          onSubmitEditing={onSubmit}
          editable={editable}
        />
        <TouchableOpacity onPress={onSubmit}>{icon}</TouchableOpacity>
      </View>
      <Separator color={isFocused ? "#6E56CF" : "#34343A"} />
    </View>
  );
};

export default StyledInput;
