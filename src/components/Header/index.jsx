import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { shade } from "polished";
import { View, Text } from "react-native";
import styles from "./styles";
import * as NavigationBar from "expo-navigation-bar";
import { useIsFocused } from "@react-navigation/native";

const Header = ({ title, color, shading = 0.2 }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) NavigationBar.setBackgroundColorAsync(shade(shading, color));
  }, [isFocused, color]);

  return (
    <View
      style={{ ...styles.container, backgroundColor: shade(shading, color) }}
    >
      {title && <Text style={styles.text}>{title}</Text>}
      <StatusBar style="light" backgroundColor={shade(shading, color)} />
    </View>
  );
};

export default Header;
