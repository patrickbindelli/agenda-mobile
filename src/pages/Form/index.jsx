import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../../components/Card";
import StyledInput from "../../components/StyledInput";

import DateIput from "../../components/DateInput";
import styles from "./styles";

import { MaterialIcons } from "@expo/vector-icons";

import { LabeledContainer } from "../../components/LabeledContainer";
import { setAyncData } from "../../utils/fetchData";

import ProfilePicturePicker from "../../components/ProfilePicturePicker";
import useGetCep from "../../hooks/userGetCep";

const Form = ({ navigation }) => {
  const [formData, setFormData] = useState({
    profilePicture: null,
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

  const { address, error, loading, consultCEP } = useGetCep();

  const handleConsultCep = () => {
    ToastAndroid.show("Pesquisando CEP...", ToastAndroid.SHORT);
    consultCEP(formData.address.postalCode);
  };

  useEffect(() => {
    if (!loading && address && !error) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          street: address.logradouro,
          postalCode: address.cep,
          neighborhood: address.bairro,
          city: address.localidade,
          country: "Brasil",
        },
      });
    }
  }, [loading, address, error]);

  function showSuccessToast() {
    ToastAndroid.show("Contato salvo com sucesso.", ToastAndroid.SHORT);
  }

  const handleCancel = () => {
    navigation.goBack();
  };

  const storeData = async (value) => {
    setAyncData(value).then(() => {
      showSuccessToast();
      navigation.goBack();
    });
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const setProfilePicture = (image) => {
    handleInputChange("profilePicture", image);
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profilePictureContainer}>
          <ProfilePicturePicker
            image={formData.profilePicture}
            setImage={setProfilePicture}
          />
        </View>
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
              title={"CEP"}
              value={formData.address.postalCode}
              onChangeText={(value) => {
                handleAddresChange("postalCode", value);
              }}
              icon={<MaterialIcons name="search" size={24} color="#A09FA6" />}
              onSubmit={handleConsultCep}
              editable={!loading}
            />
            <StyledInput
              title={"Rua"}
              value={formData.address.street}
              onChangeText={(value) => {
                handleAddresChange("street", value);
              }}
              editable={!loading}
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
              editable={!loading}
            />
            <StyledInput
              title={"Cidade"}
              value={formData.address.city}
              onChangeText={(value) => {
                handleAddresChange("city", value);
              }}
              editable={!loading}
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
          onPress={() => {
            storeData(formData);
          }}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <View style={styles.verticalSeparator} />
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form;
