import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {debounce, forIn} from 'lodash';
import {LocationData, WeatherData} from '../../types'
import { PlaceData } from '@/types/LocationData';
import {
  fetchLocations,
  fetchWeatherByLatLong,
  fetchWeatherForecast,
} from '../../api/weather'
import RenderDay from '.././RenderDay';
import CurrentWeather from '../CurrentWeather';
import LocationsList from '../LocationsList';
import SearchBar from '../SearchBar/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DailyWeatherData, ForecastDay} from '@/types/WeatherData';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [weather, setWeather] = useState<WeatherData>({});
  const [place, setPlace] = useState<PlaceData[]>([]);
  const [dailyForecast, setDailyForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);

  let currentPlace: React.SetStateAction<PlaceData[]> = []

  const handelLocation = (loc: {latitude: number, longitude: number, name: string, country: string}) => {
    currentPlace = [{
      name: loc.name,
      country: loc.country
    }]

    setLocations([]);
    setShowSearchBar(false);
    setLoading(true);
    fetchWeatherByLatLong({latitude: loc.latitude, longitude: loc.longitude}).then(data => {
      fetchMyWeatherData(loc.latitude, loc.longitude)
    });
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => 
        
        {console.log('Location list', data.results)
        setLocations(data.results ? data.results : [])}
    );
    }
    else {
      setLocations([])
    }
  };

  useEffect(() => {
    fetchLocationData();
  }, []);

  const fetchLocationData = async () => {
    (async () => {
      console.log('Permission check')
      // let status = await usePermissions().requestLocationPermission()
      // console.log(status)
      // if (status == false) {
      //   Alert.alert('Permission to access location was denied');
      //   return;
      // }
      
      // const location = await Location.getCurrentPositionAsync({});
      const location = {
        coords: {
          latitude: 26.23,
          longitude: 73.02
      }
      }

      currentPlace = [{
        name: 'Jodhpur',
        country: 'India'
      }]

      console.log(location)
      const {latitude, longitude} = location.coords
      fetchMyWeatherData(latitude, longitude)
    })();
  };

  const fetchMyWeatherData = async (latitude: number, longitude: number) => {
    (async () => {
      console.log(location)
      // const place = await Location.reverseGeocodeAsync({latitude, longitude})
      
       
        fetchWeatherByLatLong({latitude: latitude, longitude: longitude}).then(data => {
          console.log('Current', data)
          if(data.daily != undefined) {
            const dailyForecast = createDailyAverageData(data.daily)
            // console.log('dailyForecast', dailyForecast);
            setDailyForecast(dailyForecast);
            setPlace(currentPlace);
            setWeather(data);
            setLoading(false);
          }
        });
    })();
  };

  const handleDebounce = useCallback(debounce(handleSearch, 500), []);
  const {current, location, daily} = weather;
  return (
    <SafeAreaView style = {{flex : 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} className=" bg-sky-950">
      <View className="flex flex-1 bg-sky-950">
        <StatusBar barStyle={'light-content'}/>
        {loading ? (
          <View className="flex flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          <View className="flex flex-1">
            {/* SEARCH BAR SECTION */}
            <View className=" mx-4 mt-5 relative z-10">
              <SearchBar
                showSearchBar={showSearchBar}
                setShowSearchBar={setShowSearchBar}
                handleDebounce={handleDebounce}
                locations={locations}
                setLocations={setLocations}
              />

              {
                (locations.length > 0 && showSearchBar == true) ? (
                  <LocationsList
                  locations={locations}
                  handleLocation={handelLocation}
                />
                ) : null

              }
            </View>

            {/* FORCAST SECTION */}

            {/* {!showSearchBar ? ( */}
            <View className="flex-1 flex justify-around mx-4 mb-2">
              <View className="flex-column items-center justify-center">
                <Text testID='cityText' className="text-white text-3xl font-bold items-center justify-center">
                  {place[0]?.name ? place[0]?.name : ''}
                </Text>
                <Text testID='countryText' className="text-lg text-white font-semibold items-center justify-center">
                  {place[0]?.country ? ' ' + place[0]?.country : ''}
                </Text>
              </View>

              {/*  CURRENT WEATHER  */}
              {
                <CurrentWeather current={current} />
              }

               {/* NEXT DAYS FORCAST */}
               <View className="flex-row items-center ml-2 my-6">
                <Icon name="calendar" size={30} color="white" />
                <Text className="text-white font-semibold ml-3 text-lg">
                  Daily Forcast
                </Text>
              </View>

              {
                <View>
                <FlatList
                  data={dailyForecast}
                  renderItem={({item}) => <RenderDay item={item} />}
                  horizontal
                />
              </View>
              }
            </View>
          </View>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

export function createDailyAverageData(dailyData: DailyWeatherData) : ForecastDay[] {
  let dailyForecast: ForecastDay[] = [];

  for (let i=0 ; i<dailyData.time.length ; i++) {
    let forecast: ForecastDay = {
      time : dailyData.time[i],
      sunrise: dailyData.sunrise[i],
      sunset: dailyData.sunset[i],
      weather_code: dailyData.weather_code[i],
      avgtemp_c: parseFloat(((dailyData.temperature_2m_max[i] + dailyData.temperature_2m_min[i]) / 2.0).toFixed(2))
    }

    dailyForecast.push(forecast)
  }

  return dailyForecast;
}