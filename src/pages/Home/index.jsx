import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import Button from '../../components/Button';
import ContactListCard from '../../components/ContactListCard';
import { SearchBar } from '../../components/SearchBar';
import { getAsyncData } from '../../utils/fetchData';

const Home = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [data, setData] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    getAsyncData().then((data) => {
      if (data) {
        setData(data);
        setSearchResults(data);
      }
    });
  }, [isFocused]);

  const handleOnPress = (contact) => {
    navigation.navigate('Details', { id: contact.id });
  };

  const handleSearch = () => {
    const filteredData = {};

    for (const key in data) {
      const contacts = data[key].filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(searchText.toLowerCase()),
      );

      if (contacts.length > 0) {
        filteredData[key] = contacts;
      }
    }

    setSearchResults(filteredData);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <SearchBar value={searchText} onChangeText={setSearchText} onPress={handleSearch} />
          <Button
            onPress={() => {
              navigation.navigate('Add');
            }}
            icon={<MaterialIcons name="add" size={24} color="#A09FA6" />}
            background="transparent"
          />
        </View>
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollView}>
          {!Object.keys(searchResults).length && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Nenhum dado encontrado...{'\n'}Clique em '+' para adicionar um novo contato
              </Text>
            </View>
          )}
          {data &&
            Object.keys(searchResults)
              .sort()
              .map((chave, index) => {
                const list = data[chave];
                return (
                  <ContactListCard key={index} title={chave} data={list} onPress={handleOnPress} />
                );
              })}
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
