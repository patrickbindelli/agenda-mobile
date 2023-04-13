import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Card from "../Card";
import styles from "./styles";
import { Separator } from "../Separator";

import FakeProfilePicture from "../FakeProfilePicture";

export const ContactListCard = ({ title, data, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.catalogTextContainer}>
        <Text style={styles.catalogText}>{title}</Text>
      </View>
      <Card>
        {data &&
          data.map((element, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.cardContainer}
                onPress={() => onPress(element)}
                onLongPress={() => {
                  /* TODO função para excluir o elemento selecionado */
                }}
              >
                {element.profilePicture && (
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: element.profilePicture,
                    }}
                  />
                )}

                {!element.profilePicture && <FakeProfilePicture size={40} />}

                <View style={styles.nameContainer}>
                  <Text
                    style={styles.text}
                  >{`${element.firstName} ${element.lastName}`}</Text>
                  <Separator />
                </View>
              </TouchableOpacity>
            );
          })}
      </Card>
    </View>
  );
};

export default ContactListCard;
