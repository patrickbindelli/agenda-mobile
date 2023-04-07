import { ScrollView, View, Text } from "react-native";
import ContactListCard from "../../components/ContactListCard";
import Header from "../../components/Header";
import styles from "./styles";
import Button from "../../components/Button";

import { useEffect, useState } from "react";
import { getAsyncData, resetAsyncData } from "../../utils/fetchData";

import { MaterialIcons } from "@expo/vector-icons";
import { SearchBar } from "../../components/SearchBar";

import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [data, setData] = useState();

  useEffect(() => {
    getAsyncData().then((data) => {
      console.log(data);
      if (data.length) setData(data);
    });
  }, [isFocused]);

  const handleOnPress = (index) => {
    navigation.navigate("Details", { data: data[index] });
  };

  return (
    <>
      <Header title={"Contatos"} color={"#161618"} />
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar />
          <Button
            onPress={() => {
              navigation.navigate("Add");
            }}
            icon={<MaterialIcons name="add" size={24} color="#A09FA6" />}
            background={"transparent"}
          />
        </View>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollView}
        >
          {!data && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Nenhum dado encontrado...{"\n"}Clique em '+' para adicionar um
                novo contato
              </Text>
            </View>
          )}
          {data && (
            <ContactListCard
              title={"Todos"}
              data={data}
              onPress={handleOnPress}
            />
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
