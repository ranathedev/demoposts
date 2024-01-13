import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface Props {
  searchTerm: string;
  setSearchTerm: (arg: string) => void;
  onSubmit: () => void;
  isDarkMode: boolean;
}

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onSubmit,
  isDarkMode,
}: Props) => (
  <View style={styles.container}>
    <TextInput
      style={[styles.input, {color: isDarkMode ? '#fff' : '#a8a8a8'}]}
      placeholder="Search"
      placeholderTextColor="#a8a8a8"
      returnKeyType="search"
      caretHidden={true}
      value={searchTerm}
      onSubmitEditing={onSubmit}
      onChangeText={val => setSearchTerm(val)}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 20,
  },
});

export default SearchBar;
