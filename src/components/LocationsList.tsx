import {View, Text, Platform, TouchableOpacity} from 'react-native';
import React from 'react';
import {LocationData} from '../types'
import Icon from 'react-native-vector-icons/FontAwesome';

interface LocationsListProps {
  locations: LocationData[];
  handleLocation: (location: LocationData) => void;
}

const LocationsList: React.FC<LocationsListProps> = ({
  locations,
  handleLocation,
}) => {
  console.log('Inside location page', locations);

  return (
    <View
      className={` absolute w-full z-10 top-16 rounded-3xl bg-sky-900 ${
        Platform.OS == 'android' ? 'mt-4' : ''
      }`}>
      {locations.map((loc, index) => {
        let showBorder = index + 1 != locations.length;
        let borderClass = showBorder
          ? 'border-b-2 border-b-gray-400'
          : 'bg-black';
        return (
          <TouchableOpacity
            onPress={() => handleLocation(loc)}
            key={index}
            className={'flex-row items-center m-1 p-3 px-4' + borderClass}>
            <Icon name="map-marker" size={20} color={'white'} />
            <Text className="text-white font-bold text-lg ml-2">
              {loc?.name}
            </Text>
            <Text className="text-white font-bold text-lg ml-2">
              {loc?.country}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default LocationsList;
