import getWeatherImage from '../helpers/getWeatherImage'
import removeStartingDoubleSlash from '../helpers/removeStartingDoubleSlash'
import {ForecastDay} from '../types/WeatherData'
import {Image, Text, View} from 'react-native';
import React from 'react';

type RenderImageProp = {
  item: ForecastDay;
};

const RenderImage: React.FC<RenderImageProp> = ({item}) => {
  let date = new Date(item.time);
  let options: Intl.DateTimeFormatOptions = {weekday: 'long'};
  let dayName = date.toLocaleDateString('en-US', options);

  const weatherImage = getWeatherImage(String(item.weather_code))
  const imageData = weatherImage.day;

//   console.log('dayname is', dayName)
//   console.log('weather image', weatherImage)
//   console.log('item is', item)

// console.log('image', 'https://' +
//               removeStartingDoubleSlash(imageData.image || ''))

  //if (index == 0) return null;
  return (
    <View
      key={'' + item?.time}
      className=" w-32 rounded-3xl py-4 px-5 ml-3 bg-sky-900">
      <Text testID='dayName' className="text-slate-300 font-semibold text-center py-1">
        {dayName}
      </Text>
      <Image testID='dayImage'
        source={{
          uri:
            'https://' +
              removeStartingDoubleSlash(imageData.image || ''),
        }}
        className="w-20 h-20 self-center"
      />
      <Text testID='dayDescription' className="text-slate-300 font-semibold text-center py-1">
        {imageData.description ? '(' + imageData.description + ')' : ''}
      </Text>
      <Text testID='dayTemp' className="text-white font-semibold text-lg text-center">
        {item?.avgtemp_c}&#176;
      </Text>
    </View>
  );
};

export default RenderImage;
