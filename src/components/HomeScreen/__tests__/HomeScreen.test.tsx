import { mockDailyWeatherData, mockWeatherErrorData, mockWeatherHomeData } from './__mocks__/HomeScreen.mock'
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native'
// import * as Location from 'expo-location';
import axios, { AxiosRequestConfig } from 'axios';
import HomeScreen from '../HomeScreen';
import { createDailyAverageData } from '../HomeScreen';
// import { PermissionStatus, request } from 'react-native-permissions';
import '@testing-library/react-native/extend-expect';
import * as React from "react";
import MockAdapter from 'axios-mock-adapter';
import { fetchWeatherByLatLong } from '../../../api/weather/index.ts'
import SearchBar from '../../SearchBar/SearchBar.tsx'
import { LocationData } from '@/types/LocationData.ts';
import { act } from 'react'

const axiosMockInstance = axios.create();

const params = {
    latitude: 26.23,
    longitude: 73.02
}
const getWeatherDataUrl = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min`;
const mockApi = new MockAdapter(axiosMockInstance, { onNoMatch: "throwException" });

jest.mock('../../../api/weather/index', () => ({
    fetchWeatherByLatLong: jest.fn(),
}))

// jest.mock('../HomeScreen', () => ({
//         createDailyAverageData: jest.fn(),
//   }))


const mockFetchWeatherByLatLong = fetchWeatherByLatLong as jest.MockedFunction<typeof fetchWeatherByLatLong>;
// const mockCreateDailyAverageData = createDailyAverageData as jest.MockedFunction<typeof createDailyAverageData>;

beforeAll(() => {
    mockApi.reset();

    // jest.mock('react-native-permissions', () => {
    //     const Permissions = jest.requireActual('react-native-permissions');
    //     console.log(Permissions)

    //     return {
    //         ...Permissions,
    //         check: (): Promise<PermissionStatus> => Promise.resolve('granted'),
    //         request: (permission: PermissionStatus): Promise<PermissionStatus> => Promise.resolve('granted'),
    //     }
    // })

    // const mockGeolocation = {
    //     getCurrentPositionAsync: jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
    //         coords: {
    //             latitude: 26.23,
    //             longitude: 73.02
    //         }
    //     }))),
    //     reverseGeocodeAsync: jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
    //         place: 'Jodhpur',
    //         country: 'India'
    //     })))
    // };

    // Object.defineProperty(Location, 'Location.getCurrentPositionAsync', {
    //     configurable: true,
    //     writable: true,
    //     value: mockGeolocation.getCurrentPositionAsync
    // })

    // Object.defineProperty(Location, 'Location.reverseGeocodeAsync', {
    //     configurable: true,
    //     writable: true,
    //     value: mockGeolocation.reverseGeocodeAsync
    // })
});

// Mock the fetch API
beforeEach(() => {
    jest.clearAllMocks();

});


afterEach(() => {
    jest.clearAllMocks();
});

describe('Home component', () => {
    it('Fetches and displays correct location data', async () => {
        const expectedCityName = "Jodhpur";
        const expectedCountryName = "India";

        mockFetchWeatherByLatLong.mockReturnValueOnce(Promise.resolve(mockWeatherHomeData));

        const screen = render(<HomeScreen />)
        const cityText = await screen.findByTestId('cityText');
        expect(cityText).toHaveTextContent(expectedCityName);

        const countryText = await screen.findByTestId('countryText');
        expect(countryText).toHaveTextContent(expectedCountryName);
    });

    it('Fetches and displays correct weather data', async () => {
        const expectedTemperature_2m = 29.4;
        const expectedWindSpeed = 11.8;
        const expectedHumidity = 78;

        mockFetchWeatherByLatLong.mockReturnValueOnce(Promise.resolve(mockWeatherHomeData));

        const screen = render(<HomeScreen />)

        const temperature = await screen.findByTestId('currentTemp');
        expect(temperature).toHaveTextContent(String(expectedTemperature_2m) + '°');

        const windSpeed = await screen.findByTestId('currentSpeed');
        expect(windSpeed).toHaveTextContent(String(expectedWindSpeed) + ' km/h');

        const humidity = await screen.findByTestId('currentHumidity');
        expect(humidity).toHaveTextContent(String(expectedHumidity) + '%');
    });

    it('Displays the correct weather icon', async () => {
        mockFetchWeatherByLatLong.mockReturnValueOnce(Promise.resolve(mockWeatherHomeData));
        const screen = render(<HomeScreen />)
        const imageElement = await screen.findAllByTestId('dayImage')
        expect(imageElement).toHaveLength(7);
    });

    it('Does not fetches and displays incorrect location data in case of error scenario', async () => {
        mockFetchWeatherByLatLong.mockReturnValueOnce(Promise.resolve(mockWeatherErrorData));

        const screen = render(<HomeScreen />)
        const cityText = screen.queryByTestId('cityText');
        expect(cityText).toBeNull();

        const countryText = screen.queryByTestId('countryText');
        expect(countryText).toBeNull();
    });

    it('Does not fetches and displays incorrect weather data in case of error scenario', async () => {
        const expectedTemperature_2m = ''
        const expectedWindSpeed = ''
        const expectedHumidity = ''

        mockFetchWeatherByLatLong.mockReturnValueOnce(Promise.resolve(mockWeatherErrorData));

        const screen = render(<HomeScreen />)
        const temperature = screen.queryByTestId('currentTemp');
        expect(temperature).toBeNull();

        const windSpeed = screen.queryByTestId('currentSpeed');
        expect(windSpeed).toBeNull();

        const humidity = screen.queryByTestId('currentHumidity');
        expect(humidity).toBeNull();
    });

    it('Does not displays the weather icon', async () => {
        mockFetchWeatherByLatLong.mockReturnValueOnce(Promise.resolve(mockWeatherErrorData));

        const screen = render(<HomeScreen />)
        const imageElement = screen.queryAllByTestId('dayImage')
        expect(imageElement).toHaveLength(0)

    });

    it('Should open the search modal', async () => {
        const showSearchBar = true;
        const setShowSearchBar = jest.fn();
        const locations: LocationData[] = [];
        const setLocations = jest.fn();
        const handleDebounce = jest.fn();

        const screen = render(<SearchBar
            showSearchBar={showSearchBar}
            setShowSearchBar={setShowSearchBar}
            handleDebounce={handleDebounce}
            locations={locations}
            setLocations={setLocations}

        />)

        const searchIcon = await screen.findByTestId('showSearchBar');
        fireEvent.press(searchIcon);

        expect(await screen.findByTestId('searchBar')).toBeTruthy();

        fireEvent.press(searchIcon);
    });
})
