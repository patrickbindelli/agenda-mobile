import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Card from "../../components/Card";
import Header from "../../components/Header";
import StyledInput from "../../components/StyledInput";

import DateIput from "../../components/DateInput";
import styles from "./styles";

import { MaterialIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LabeledContainer } from "../../components/LabeledContainer";
import { setAyncData } from "../../utils/fetchData";

const Form = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    phones: [{ number: "", type: "" }],
    emails: [{ address: "" }],
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  const handleCancel = () => {
    navigation.goBack();
  };

  const storeData = async (value) => {
    setAyncData(value)
      .then(() => {
        console.log("salvei");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddArrayField = (array, arrayField) => {
    const currentEmails = formData[array];
    currentEmails.push({ [arrayField]: "" });

    setFormData({ ...formData, [array]: currentEmails });
  };

  const handleAddEmail = () => {
    handleAddArrayField("emails", "address");
  };

  const handleAddPhone = () => {
    handleAddArrayField("phones", "number");
  };

  const handleRemoveArrayElement = (array, index) => {
    const currentEmails = [...formData[array]];
    currentEmails.splice(index, 1);

    setFormData({ ...formData, [array]: currentEmails });
  };

  const handleAddresChange = (name, value) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleArrayInputChange = (index, field, arrayField, value) => {
    const updatedArray = [...formData[field]];

    updatedArray[index] = {
      ...updatedArray[index],
      [arrayField]: value,
    };

    setFormData((prevState) => ({ ...prevState, [field]: updatedArray }));
  };

  return (
    <>
      <Header title={"Adicionar Contato"} color={"#161618"} shading={0} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 20 }}
      >
        <Card>
          <LabeledContainer label={"Nome"}>
            <StyledInput
              title={"Nome"}
              value={formData.firstName}
              onChangeText={(value) => {
                handleInputChange("firstName", value);
              }}
            />
            <StyledInput
              title={"Sobrenome"}
              value={formData.lastName}
              onChangeText={(value) => {
                handleInputChange("lastName", value);
              }}
            />
          </LabeledContainer>

          <LabeledContainer label={"Aniversário"}>
            <DateIput
              placeholder={"Aniversário"}
              title={"Aniversário"}
              date={formData.birthday}
              setDate={(value) => {
                handleInputChange("birthday", value);
              }}
            />
          </LabeledContainer>

          <LabeledContainer
            label={"Telefone"}
            icon={<MaterialIcons name="add" size={24} color="#A09FA6" />}
            onIconPress={handleAddPhone}
          >
            {formData.phones.map((phone, index) => {
              return (
                <View key={index} style={styles.horizontalContainer}>
                  <View style={styles.inputContainer}>
                    <StyledInput
                      title={"Telefone"}
                      value={phone.number}
                      onChangeText={(value) => {
                        handleArrayInputChange(
                          index,
                          "phones",
                          "number",
                          value
                        );
                      }}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => handleRemoveArrayElement("phones", index)}
                  >
                    <MaterialIcons name="remove" size={20} color="#E54D2E" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </LabeledContainer>

          <LabeledContainer
            label={"Email"}
            icon={<MaterialIcons name="add" size={24} color="#A09FA6" />}
            onIconPress={handleAddEmail}
          >
            {formData.emails.map((email, index) => {
              return (
                <View key={index} style={styles.horizontalContainer}>
                  <View style={styles.inputContainer}>
                    <StyledInput
                      title={"Email"}
                      value={email.address}
                      onChangeText={(value) => {
                        handleArrayInputChange(
                          index,
                          "emails",
                          "address",
                          value
                        );
                      }}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => handleRemoveArrayElement("emails", index)}
                  >
                    <MaterialIcons name="remove" size={20} color="#E54D2E" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </LabeledContainer>

          <LabeledContainer label={"Endereço"}>
            <StyledInput
              title={"Rua"}
              value={formData.address.street}
              onChangeText={(value) => {
                handleAddresChange("street", value);
              }}
            />
            <StyledInput
              title={"Número"}
              value={formData.address.number}
              onChangeText={(value) => {
                handleAddresChange("number", value);
              }}
            />
            <StyledInput
              title={"Bairro"}
              value={formData.address.neighborhood}
              onChangeText={(value) => {
                handleAddresChange("neighborhood", value);
              }}
            />
            <StyledInput
              title={"Cidade"}
              value={formData.address.city}
              onChangeText={(value) => {
                handleAddresChange("city", value);
              }}
            />
            <StyledInput
              title={"CEP"}
              value={formData.address.postalCode}
              onChangeText={(value) => {
                handleAddresChange("postalCode", value);
              }}
            />
            <StyledInput
              title={"País"}
              value={formData.address.country}
              onChangeText={(value) => {
                handleAddresChange("country", value);
              }}
            />
          </LabeledContainer>
        </Card>
      </ScrollView>

      <View style={styles.options}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => storeData(formData)}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <View style={styles.verticalSeparator} />
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Form;
