import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Card from '../../components/Card';
import DateInput from '../../components/DateInput';
import { LabeledContainer } from '../../components/LabeledContainer';
import ProfilePicturePicker from '../../components/ProfilePicturePicker';
import StyledInput from '../../components/StyledInput';
import useGetCep from '../../hooks/userGetCep';
import { setAsyncData, updateAsyncData } from '../../utils/fetchData';

const Form = ({ route, navigation }) => {
  const { data } = route.params || {};

  const [isEditing] = useState(!!data);

  const handleCancel = () => {
    navigation.goBack();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    defaultValues: isEditing
      ? { ...data }
      : {
          profilePicture: null,
          firstName: '',
          lastName: '',
          address: {
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            postalCode: '',
            country: '',
          },
          phones: [{ number: '' }],
          emails: [{ address: '' }],
        },
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: 'phones',
    rules: {
      required: true,
      minLength: 1,
      maxLength: 5,
    },
  });

  const {
    fields: mailFields,
    append: appendMail,
    remove: removemail,
  } = useFieldArray({
    control,
    name: 'emails',
    rules: {
      required: true,
      minLength: 1,
      maxLength: 5,
    },
  });

  const { address, error, loading, consultCEP } = useGetCep();

  const handleConsultCep = () => {
    ToastAndroid.show('Pesquisando CEP...', ToastAndroid.SHORT);
    consultCEP(getValues('address.postalCode'));
  };

  useEffect(() => {
    if (!loading && address && !error) {
      setValue('address.city', address.localidade);
      setValue('address.street', address.logradouro);
      setValue('address.postalCode', address.cep);
      setValue('address.neighborhood', address.bairro);
      setValue('address.country', 'Brasil');

      clearErrors('address');
    }
  }, [loading, address, error]);

  const onSubmit = async (data) => {
    if (!isEditing) {
      setAsyncData(data).then(() => {
        ToastAndroid.show('Contato salvo.', ToastAndroid.SHORT);
        navigation.goBack();
      });
    } else {
      updateAsyncData(data.id, data).then(() => {
        ToastAndroid.show('Contato atualizado.', ToastAndroid.SHORT);
        navigation.goBack();
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profilePictureContainer}>
          <Controller
            name="profilePicture"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <ProfilePicturePicker image={value} setImage={onChange} />
            )}
          />
        </View>
        <Card>
          <LabeledContainer label="Nome">
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  title="Nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.firstName}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  title="Sobrenome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.lastName}
                />
              )}
            />
          </LabeledContainer>

          <LabeledContainer label="Aniversário">
            <Controller
              name="birthday"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DateInput
                  placeholder="Aniversário"
                  title="Aniversário"
                  date={isEditing ? new Date(value) : value}
                  setDate={onChange}
                  error={errors.birthday}
                />
              )}
            />
          </LabeledContainer>

          <LabeledContainer
            label="Telefones"
            icon={<MaterialIcons name="add" size={24} color="#A09FA6" />}
            onIconPress={() => {
              if (phoneFields.length < 5) {
                appendPhone({ number: '' });
              }
            }}
          >
            {phoneFields.map((field, index) => {
              return (
                <Controller
                  key={index}
                  name={`phones[${index}].number`}
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <StyledInput
                      title="Telefone"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmit={() => {
                        if (index > 0) removePhone(index);
                      }}
                      value={value}
                      error={errors?.phones?.[index]?.['number']}
                      onEnter={false}
                      icon={<MaterialIcons name="remove" size={20} color="#E54D2E" />}
                    />
                  )}
                />
              );
            })}
          </LabeledContainer>

          <LabeledContainer
            label="Emails"
            icon={<MaterialIcons name="add" size={24} color="#A09FA6" />}
            onIconPress={() => {
              if (phoneFields.length < 5) {
                appendMail({ address: '' });
              }
            }}
          >
            {mailFields.map((field, index) => {
              return (
                <Controller
                  key={index}
                  name={`emails[${index}].address`}
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <StyledInput
                      title="Email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmit={() => {
                        if (index > 0) removemail(index);
                      }}
                      value={value}
                      error={errors?.emails?.[index]?.['address']}
                      onEnter={false}
                      icon={<MaterialIcons name="remove" size={20} color="#E54D2E" />}
                    />
                  )}
                />
              );
            })}
          </LabeledContainer>

          <LabeledContainer label="Endereço">
            <Controller
              name="address.postalCode"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  title="CEP"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmit={handleConsultCep}
                  value={value}
                  error={errors.address?.postalCode}
                  icon={<MaterialIcons name="search" size={24} color="#A09FA6" />}
                />
              )}
            />
            <Controller
              name="address.street"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  title="Rua"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.address?.street}
                />
              )}
            />
            <Controller
              name="address.number"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  title="Número"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.address?.number}
                />
              )}
            />
            <Controller
              name="address.neighborhood"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  title="Bairro"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.address?.neighborhood}
                />
              )}
            />
            <Controller
              name="address.city"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  title="Cidade"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.address?.city}
                />
              )}
            />
            <Controller
              name="address.country"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  title="País"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.address?.country}
                />
              )}
            />
          </LabeledContainer>
        </Card>
      </ScrollView>

      <View style={styles.options}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
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
