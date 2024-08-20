import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {debounce, forIn} from 'lodash';
import usePermissions from '../../helpers/LocationPermissions'
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import {LocationData, WeatherData} from '../../types'
import {
  fetchLocations,
  fetchWeatherByLatLong,
  fetchWeatherForecast,
} from '../../api/weather'
import RenderDay from '.././RenderDay';
import CurrentWeather from '../CurrentWeather';
import LocationsList from '../LocationsList';
import SearchBar from '../SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DailyWeatherData, ForecastDay} from '@/types/WeatherData';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [weather, setWeather] = useState<WeatherData>({});
  const [place, setPlace] = useState<Location.LocationGeocodedAddress[]>([]);
  const [dailyForecast, setDailyForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);

  const handelLocation = (loc: {latitude: number, longitude: number, name: string, country: string}) => {
    console.log(locations);
    setLocations([]);
    setShowSearchBar(false);
    setLoading(true);
    fetchWeatherByLatLong({latitude: loc.latitude, longitude: loc.longitude}).then(data => {
      fetchMyWeatherData(loc.latitude, loc.longitude)
    });
    // fetchWeatherForecast({
    //   cityName: loc.name,
    // }).then(data => {
    //   setWeather(data);
    //   setLoading(false);
    //   console.log(data);
    // });
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

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('inside');
  //     fetchMyWeatherData();
  //     return () => {}
  //   }, [])
  // )

  const fetchLocationData = async () => {
    (async () => {
      console.log('Permission check')
      let status = await usePermissions().requestLocationPermission()
      console.log(status)
      if (status == false) {
        Alert.alert('Permission to access location was denied');
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({});
      console.log(location)
      const {latitude, longitude} = location.coords
      fetchMyWeatherData(latitude, longitude)
    })();
  };

  const fetchMyWeatherData = async (latitude: number, longitude: number) => {
    (async () => {
      console.log(location)
      const place = await Location.reverseGeocodeAsync({latitude, longitude})
        console.log(place)
        console.log(typeof(place))
        console.log(place[0].city)
        console.log(place[0].country)

        fetchWeatherByLatLong({latitude: latitude, longitude: longitude}).then(data => {
          const dailyForecast = createDailyAverageData(data.daily)
          console.log('dailyForecast', dailyForecast);
          setDailyForecast(dailyForecast);
          setPlace(place);
          setWeather(data);
          setLoading(false);
        });
    })();
  };

  const handleDebounce = useCallback(debounce(handleSearch, 500), []);
  // console.log('weather', weather)
  const {current, location, daily} = weather;
  
  console.log('weather.current',current);
  console.log('weather.location', location);
  console.log('weather.daily', daily?.time);
  // console.log('Search', showSearchBar);
  // console.log('Locations', locations);
  // console.log(dailyForecast)

  return (
    <SafeAreaView style = {{flex : 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} className=" bg-sky-950">
      <View className="flex flex-1 bg-sky-950">
        <StatusBar style="light" />
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
                  {place[0].city}
                </Text>
                <Text testID='countryText' className="text-lg text-white font-semibold items-center justify-center">
                  {' ' + place[0].country}
                </Text>
              </View>
              {/*  CURRENT WEATHER  */}
              <CurrentWeather current={current} />

              {/* NEXT DAYS FORCAST */}
              <View className="flex-row items-center ml-2 my-6">
                <Icon name="calendar" size={30} color="white" />
                <Text className="text-white font-semibold ml-3 text-lg">
                  Daily Forcast
                </Text>
              </View>
              <View>
                <FlatList
                  data={dailyForecast}
                  renderItem={({item}) => <RenderDay item={item} />}
                  horizontal
                />
              </View>
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
      avgtemp_c: (dailyData.temperature_2m_max[i] + dailyData.temperature_2m_min[i]) / 2.0
    }

    dailyForecast.push(forecast)
  }

  return dailyForecast;
}