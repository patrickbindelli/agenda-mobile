import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Card from '../Card';
import FakeProfilePicture from '../FakeProfilePicture';
import { Separator } from '../Separator';

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
                  <Text style={styles.text}>{`${element.firstName} ${element.lastName}`}</Text>
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
