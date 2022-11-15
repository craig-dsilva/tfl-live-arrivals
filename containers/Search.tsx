import { StyleSheet, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';

interface SearchInterface {
  handleStations: any;
  handleArrivals: any;
}

const Search: React.FC<SearchInterface> = ({
  handleStations,
  handleArrivals,
}) => {
  const [enteredQuery, setEnteredQuery] = useState('');

  const searchInputHandler = (query: string) => {
    setEnteredQuery(query);
  };

  const getStations = (stationName: string) => {
    const fetchStations = async () => {
      try {
        const res = await fetch(
          `https://api.tfl.gov.uk/StopPoint/Search/${stationName}`
        );
        const data = await res.json();
        handleStations(data.matches.filter((stn: any) => stn.zone));
      } catch (error) {
        console.error(error);
      }
    };
    fetchStations();
    handleArrivals([]);
  };

  const onClickSearch = () => {
    if (enteredQuery === '') {
      return;
    }
    getStations(enteredQuery);
    setEnteredQuery('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.TextInput}
        placeholder="Enter station name"
        onChangeText={searchInputHandler}
        value={enteredQuery}
      />
      <Button title="Search" color={'#113b92'} onPress={onClickSearch} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
});
