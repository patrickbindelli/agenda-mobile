import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const STORAGE_KEY = 'contatos';

export const getAsyncData = async () => {
  const response = await AsyncStorage.getItem(STORAGE_KEY);
  return response ? JSON.parse(response) : undefined;
};

export const getAsyncDataById = async (id) => {
  const data = await getAsyncData();
  if (!data) {
    return undefined;
  }

  for (const key in data) {
    const match = data[key].find((item) => item.id === id);
    if (match) {
      return match;
    }
  }

  return undefined;
};
export const setAsyncData = async (value) => {
  const name = value.firstName.trim();
  const firstChar = name.charAt(0).toUpperCase();

  const data = (await getAsyncData()) || {};

  value.id = Crypto.randomUUID();

  const key = /^[A-Z]/.test(firstChar) ? firstChar : '#';
  data[key] = [...(data[key] || []), value];

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const updateAsyncData = async (id, updatedValues) => {
  const data = await getAsyncData();
  if (!data) {
    return;
  }

  for (const key in data) {
    data[key] = data[key].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...updatedValues,
        };
      } else {
        return item;
      }
    });
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const deleteAsyncData = async (id) => {
  const data = await getAsyncData();
  if (!data) {
    return;
  }

  for (const key in data) {
    data[key] = data[key].filter((item) => item.id !== id);
    if (data[key].length === 0) {
      delete data[key];
    }
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const resetAsyncData = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
