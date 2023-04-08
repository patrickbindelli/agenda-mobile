import React, { useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

import { useActionSheet } from "@expo/react-native-action-sheet";

import * as ImagePicker from "expo-image-picker";

const ProfilePicturePicker = ({ image, setImage }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const options = ["Abrir Câmera", "Selecionar Arquivo", "Cancelar"];
    const cancelButtonIndex = 2;
    const iconsColor = "#fff";
    const cancelIconColor = "#E5484D";
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        cancelButtonTintColor: cancelIconColor,
        title: "Selecionar imagem",
        icons: [
          <MaterialIcons name="camera-alt" size={24} color={iconsColor} />,
          <MaterialIcons name="image" size={24} color={iconsColor} />,
          <MaterialIcons name="close" size={24} color={cancelIconColor} />,
        ],
        containerStyle: styles.actionSheet,
        textStyle: styles.text,
        titleTextStyle: styles.text,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            handlePickImageFromCamera();
            break;
          case 1:
            handlePickImage();
            break;
        }
      }
    );
  };

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const handlePickImageFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted) {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {!image && <MaterialIcons name="add" size={50} color="#49494F" />}
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </TouchableOpacity>
  );
};

export default ProfilePicturePicker;
