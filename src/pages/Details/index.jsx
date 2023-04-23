import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, ToastAndroid, View } from "react-native";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FakeProfilePicture from "../../components/FakeProfilePicture";
import LabeledText from "../../components/LabeledText";
import { Separator } from "../../components/Separator";
import { deleteAsyncData, getAsyncDataById } from "../../utils/fetchData";
import { useIsFocused } from "@react-navigation/native";
import styles from "./styles";

const Details = ({ route, navigation }) => {
  const { id } = route.params;

  const isFocused = useIsFocused();
  const [data, setData] = useState();

  useEffect(() => {
    getAsyncDataById(id).then((data) => {
      setData(data);
    });
  }, [id, isFocused]);

  const locale = "auto";
  const localeOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const handleDelete = async () => {
    await deleteAsyncData(data.id);
    ToastAndroid.show("Excluido.", ToastAndroid.SHORT);
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.navigate("Add", { data });
  };

  return (
    <View style={styles.container}>
      {data && (
        <>
          <View style={styles.imageContainer}>
            {data.profilePicture && (
              <Image
                style={styles.profilePicture}
                source={{
                  uri: data.profilePicture,
                }}
              />
            )}
            {!data.profilePicture && (
              <FakeProfilePicture size={100} backgroundColor="#443592" />
            )}

            <Text
              style={styles.profileNameText}
            >{`${data.firstName} ${data.lastName}`}</Text>
          </View>

          <View style={styles.optionsContainer}>
            <Button
              title={"Editar"}
              icon={<MaterialIcons name="edit" size={24} color="#fff" />}
              onPress={handleEdit}
            />
            <Button
              title={"Excluir"}
              icon={<MaterialIcons name="delete" size={24} color="#fff" />}
              onPress={handleDelete}
            />
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
              {data.birthday && (
                <LabeledText
                  title={"Aniversário"}
                  text={new Date(data.birthday).toLocaleDateString(
                    locale,
                    localeOptions
                  )}
                />
              )}
            </Card>

            {data.emails.length && data.emails[0].address && (
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
            )}

            {data.phones.length && data.phones[0].number && (
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
            )}

            {(data.address.street ||
              data.address.number ||
              data.address.neighborhood ||
              data.address.postalCode ||
              data.address.country) && (
              <Card>
                {<LabeledText title={"Rua"} text={data.address.street} />}
                <Separator />
                <LabeledText title={"Número"} text={data.address.number} />
                <Separator />
                <LabeledText
                  title={"Bairro"}
                  text={data.address.neighborhood}
                />
                <Separator />
                <LabeledText title={"CEP"} text={data.address.postalCode} />
                <Separator />
                <LabeledText title={"País"} text={data.address.country} />
              </Card>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Details;
