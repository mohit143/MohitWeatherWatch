import {View, Text, Image} from 'react-native';
import React from 'react';
import removeStartingDoubleSlash from '../helpers/removeStartingDoubleSlash'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/FontAwesome';
import {CurrentWeatherData} from '../types/CurrentWeatherData';
import getWeatherImage from '../helpers/getWeatherImage'
import { WeatherCode } from '../helpers/getWeatherImage';

type CurrentWeatherProp = {
  current?: CurrentWeatherData;
};
const CurrentWeather: React.FC<CurrentWeatherProp> = ({current}) => {
  
  const weatherImage = getWeatherImage(String(current?.weather_code))
  const currDate = new Date(current?.time!);
  const hour = currDate.getHours();
  const isDayTime = hour > 6 && hour < 19;
  const imageData = isDayTime ? weatherImage.day : weatherImage.night;
console.log('image', 'https://' +
              removeStartingDoubleSlash(imageData.image || ''))
  return (
    <>
      {/* IMAGE VIEW */}
      <View className="justify-center flex-column items-center">
        <Image testID='currentImage' 
            source={{
              uri:
                'https://' +
                removeStartingDoubleSlash(imageData.image || '')
            }}
          className="w-52 h-52"
        />
      </View>
      {/* TEMPERATURE CELCUS & WEATHER TEXT */}
      <View className="-mt-5 mb-2 bg-sky-900 p-2 rounded-xl">
        <Text testID='currentDescription' className="text-center text-xl text-white tracking-widest">
          {imageData.description ? '(' + imageData.description + ')' : ''}
        </Text>
      </View>
      <View className="space-y-6 m-4">
        <Text testID='currentTemp' className="text-center text-6xl text-white font-bold">
          {current?.temperature_2m}&#176;
        </Text>
      </View>
      {/* WEATHER CONDITIONS */}
      <View className="items-center">
        <View className="flex-row space-x-8 items-center ">
          <View className="flex-row space-x-1 items-center">
            <Feather name="wind" size={30} color="white" />
            <Text testID='currentSpeed' className="items-center text-white text-lg font-semibold">
              {current?.wind_speed_10m} km
            </Text>
          </View>
          <View className="flex-row space-x-1 items-center">
            <Entypo name="drop" size={30} color="white" />
            <Text testID='currentHumidity' className="items-center text-white text-lg font-semibold">
              {current?.relative_humidity_2m}%
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CurrentWeather;
