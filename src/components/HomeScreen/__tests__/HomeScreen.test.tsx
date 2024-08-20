import { mockDailyWeatherData, mockWeatherHomeData } from './__mocks__/HomeScreen.mock'
import { render, screen, waitFor } from '@testing-library/react-native'
import * as Location from 'expo-location';
import axios, { AxiosRequestConfig } from 'axios';
import { mockWeatherApiResponse } from '__tests__/mocks/api/MockWeatherApiResponse';
import HomeScreen from '../HomeScreen';
import { createDailyAverageData } from '../HomeScreen';
import { PermissionStatus, request } from 'react-native-permissions';
import '@testing-library/react-native/extend-expect';

beforeAll(() => {
    jest.mock('react-native-permissions', () => {
        const Permissions = jest.requireActual('react-native-permissions');
        console.log(Permissions)

        return {
            ...Permissions,
            check: (): Promise<PermissionStatus> => Promise.resolve('granted'),
            request: (permission: PermissionStatus): Promise<PermissionStatus> => Promise.resolve('granted'),
        }
    })

    const mockGeolocation = {
        getCurrentPositionAsync: jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
            coords: {
                latitude: 26.23,
                longitude: 73.02
            }
        }))),
        reverseGeocodeAsync: jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
            place: 'Jodhpur',
            country: 'India'
        })))
    };

    Object.defineProperty(Location, 'Location.getCurrentPositionAsync', {
        configurable: true,
        writable: true,
        value: mockGeolocation.getCurrentPositionAsync
    })

    Object.defineProperty(Location, 'Location.reverseGeocodeAsync', {
        configurable: true,
        writable: true,
        value: mockGeolocation.reverseGeocodeAsync
    })
});

// Mock the fetch API
beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue({
        data: mockWeatherHomeData
    })

    jest.mock('../HomeScreen', () => ({
        createDailyAverageData: jest.fn().mockImplementationOnce(() => mockDailyWeatherData)
    }));
});


afterEach(() => {
    jest.clearAllMocks();
});

test('fetches and displays weather data', async () => {
    const expectedCityName = "Jodhpur";
    const expectedCountryName = "India";
    const expectedTemperature_2m = 29.4;
    const expectedWeatherCode = 3;
    const expectedWindSpeed = 11.8;
    const expectedHumidity = 78

    render(<HomeScreen />)

    await waitFor(() => {
        // Using `findBy` query to wait for asynchronous operation to finish
        const cityText = screen.findByTestId('cityText');
        expect(cityText).toHaveTextContent(expectedCityName);

        const countryText = screen.findByTestId('countryText');
        expect(countryText).toHaveTextContent(expectedCountryName);

        const temperature = screen.findByTestId('currentTemp');
        expect(temperature).toHaveTextContent(String(expectedTemperature_2m));

        const windSpeed = screen.findByTestId('currentSpeed');
        expect(windSpeed).toHaveTextContent(String(expectedWindSpeed));

        const humidity = screen.findByTestId('currentHumidity');
        expect(humidity).toHaveTextContent(String(expectedHumidity));

    });
});

test('Displays the correct weather icon', async () => {

    render(<HomeScreen />)

    await waitFor(() => {
        // Using `findBy` query to wait for asynchronous operation to finish
        expect(screen.findAllByTestId('dayImage')).toHaveLength(7);

    });
});