import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

export const SearchBar = ({ value, onChangeText, onPress }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        selectionColor={"#6E56CF"}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onPress}
      />
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons name="search" size={24} color="#A09FA6" />
      </TouchableOpacity>
    </View>
  );
};
