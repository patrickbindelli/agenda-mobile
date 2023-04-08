import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Card from "../../components/Card";
import LabeledText from "../../components/LabeledText";
import { Separator } from "../../components/Separator";
import styles from "./styles";

const Details = ({ route, navigation }) => {
  const { data } = route.params;

  const locale = "auto";
  const localeOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.profilePicture}
          source={{
            uri: data.profilePicture,
          }}
        />
        <Text
          style={styles.profileNameText}
        >{`${data.firstName} ${data.lastName}`}</Text>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Card>
          <LabeledText title={"Nome"} text={data.firstName} />
          <Separator />
          <LabeledText title={"Sobrenome"} text={data.lastName} />
          <Separator />
          <LabeledText
            title={"Aniversário"}
            text={new Date(data.birthday).toLocaleDateString(
              locale,
              localeOptions
            )}
          />
        </Card>

        <Card>
          {data.emails.map((email, index) => {
            return (
              <View style={styles.verticalContainer} key={index}>
                <LabeledText title={"Email"} text={email.address} />
                {index + 1 != data.emails.length && <Separator />}
              </View>
            );
          })}
        </Card>

        <Card>
          {data.phones.map((phone, index) => {
            return (
              <View style={styles.verticalContainer} key={index}>
                <LabeledText title={"Telefone"} text={phone.number} />
                {index + 1 != data.emails.length && <Separator />}
              </View>
            );
          })}
        </Card>

        <Card>
          <LabeledText title={"Rua"} text={data.address.street} />
          <Separator />
          <LabeledText title={"Número"} text={data.address.number} />
          <Separator />
          <LabeledText title={"Bairro"} text={data.address.neighborhood} />
          <Separator />
          <LabeledText title={"CEP"} text={data.address.postalCode} />
          <Separator />
          <LabeledText title={"País"} text={data.address.country} />
        </Card>
      </ScrollView>
    </View>
  );
};

export default Details;
