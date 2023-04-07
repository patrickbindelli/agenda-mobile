import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "contatos";

export const getAsyncData = async () => {
  let data = [];
  const response = await AsyncStorage.getItem(STORAGE_KEY);

  if (response) data = JSON.parse(response);

  return data;
};

export const setAyncData = async (value) => {
  let data = await getAsyncData();
  value.id = uuidv4();
  data.push(value);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const resetAsyncData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log("Chave removida");
  } catch (err) {
    console.log("é deu erro fi");
  }
};
