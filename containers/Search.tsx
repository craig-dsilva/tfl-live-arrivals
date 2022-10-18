import { StyleSheet, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';

interface SearchInterface {
  handleStations: (enteredQuery: string) => void;
}

const Search: React.FC<SearchInterface> = ({ handleStations }) => {
  const [enteredQuery, setEnteredQuery] = useState('');

  const searchInputHandler = (query: string) => {
    setEnteredQuery(query);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.TextInput}
        placeholder="Enter station name"
        onChangeText={searchInputHandler}
      />
      <Button title="Search" onPress={() => handleStations(enteredQuery)} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
});