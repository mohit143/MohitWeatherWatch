import { fireEvent, render, screen, waitFor } from '@testing-library/react-native'
import '@testing-library/react-native/extend-expect';
import * as React from "react";
import SearchBar from '../SearchBar';
import { LocationData } from '@/types';

describe('SearchInput', () => {

    it('calls onChangeText when text input changes', async () => {
        const showSearchBar = true;
        const setShowSearchBarMock = jest.fn();
        const locations : LocationData[] = [];
        const setLocations = jest.fn();
        const handleDebounceMock = jest.fn();

        const screen = render(<SearchBar 
            showSearchBar={showSearchBar}
            setShowSearchBar={setShowSearchBarMock}
            handleDebounce={handleDebounceMock}
            locations={locations}
            setLocations={setLocations}
        
        />)

      const input = await screen.findByTestId('searchBar');

      fireEvent.changeText(input, 'New text');
  
      expect(handleDebounceMock).toHaveBeenCalledWith('New text');
    });
    it('calls onSearch when the search icon is pressed', async () => {
        const showSearchBar = true;
        const setShowSearchBarMock = jest.fn();
        const locations : LocationData[] = [];
        const setLocations = jest.fn();
        const handleDebounceMock = jest.fn();
  
        const screen = render(<SearchBar 
            showSearchBar={showSearchBar}
            setShowSearchBar={setShowSearchBarMock}
            handleDebounce={handleDebounceMock}
            locations={locations}
            setLocations={setLocations}
        
        />)
  
        const searchIcon = await screen.findByTestId('showSearchBar');
        fireEvent.press(searchIcon);
        expect(setShowSearchBarMock).toHaveBeenCalled();
    });
  });
  