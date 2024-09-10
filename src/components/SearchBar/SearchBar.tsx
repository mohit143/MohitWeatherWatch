import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { LocationData } from '@/types';

interface SearchBarProps {
  showSearchBar: boolean;
  setShowSearchBar: Dispatch<SetStateAction<boolean>>;
  handleDebounce: (text: string) => void;
  locations: LocationData[];
  setLocations: Dispatch<SetStateAction<LocationData[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showSearchBar,
  setShowSearchBar,
  handleDebounce,
  locations,
  setLocations
}) => {
  return (
    <View
      className={`flex-row justify-end items-center rounded-full ${
        Platform.OS == 'android' ? 'mt-4 ' : ''
      } ${showSearchBar ? 'bg-sky-900' : ''}`}>
      {showSearchBar ? (
        <TextInput testID='searchBar'
          onChangeText={handleDebounce}
          placeholder="Search City"
          placeholderTextColor={'white'}
          className="h-12 pl-4 text-xl pb-1 flex-1 text-white"
        />
      ) : null}

      <TouchableOpacity testID='showSearchBar'
        onPress={() => {
          console.log('Inside search', showSearchBar)
          setShowSearchBar(!showSearchBar);
          setLocations([])
        }}
        className="p-3 rounded-full m-1 bg-sky-900">
        <Icon name="search-location" size={24} color={'#FFFFFF'} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
