import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import isEmpty from 'lodash/isEmpty';
import AutocompleteInput from 'react-native-autocomplete-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../styles/Colors';

interface AutocompleteSelectProps {
  placeholder?: string;
  fetchResults: (text: string) => Promise<{ name: string }[]>;
  onSelectResult: (selectedItem: any) => void;
  selectedItem?: string;
}

const AutocompleteSelect = ({
  placeholder = '',
  fetchResults,
  onSelectResult,
  selectedItem,
}: AutocompleteSelectProps) => {
  const [value, setValue] = useState<string>();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!isEmpty(selectedItem)) {
      setValue(selectedItem);
    }
  }, [selectedItem]);

  const onChangeText = async (text: string) => {
    setValue(text);
    const newResults = await fetchResults(text);
    setResults(newResults);
  };

  return (
    <AutocompleteInput
      data={results}
      value={value}
      onChangeText={onChangeText}
      flatListProps={{
        keyExtractor: (_, idx) => idx.toString(),
        renderItem: ({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setValue(item.name);
              setResults([]);
              onSelectResult(item);
            }}
            style={styles.itemTouchable}>
            <Text style={styles.resultsText}>{item.name}</Text>
          </TouchableOpacity>
        ),
        style: styles.flatListPropsStyle,
      }}
      placeholder={placeholder}
      placeholderTextColor={Colors.GrayFontColor}
      listContainerStyle={styles.listContainerStyle}
      style={styles.autocompleteStyle}
      inputContainerStyle={styles.inputContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  autocompleteStyle: {
    height: 48,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 1000
  },
  resultsText: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: Colors.GRAY_BACKGROUND,
    height: 50,
    zIndex: 1000
  },
  listContainerStyle: {
    width: '100%',
    zIndex: 1000
  },
  flatListPropsStyle: {
    borderWidth: 0,
    backgroundColor: Colors.GRAY_BACKGROUND,
    minHeight: 65,
    height: 150,
    width: '100%',
    zIndex: 1000
  },
  itemTouchable: {
    paddingVertical: 5,
  },
});

export default AutocompleteSelect;
