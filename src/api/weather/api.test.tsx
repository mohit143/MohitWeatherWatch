import { mockWeatherHomeData } from '@/components/HomeScreen/__tests__/__mocks__/HomeScreen.mock.ts';
import { mockWeatherApiResponse } from '../../../__tests__/mocks/api/MockWeatherApiResponse.ts'
import { apiCall } from "./index.ts"
import { fetchWeatherByLatLong } from "./index.ts";
import axios, {AxiosRequestConfig} from 'axios'
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react-native';

const params = {
    latitude: 26.2389,
    longitude: 73.0243
}
const axiosMockInstance = axios.create();

   const getWeatherDataUrl =  `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min`;
const mockApi = new MockAdapter(axiosMockInstance, { onNoMatch: "throwException" });

beforeAll(() => {
    mockApi.reset();
  });
  
//   afterEach(() => {
//     mockApi.reset()
// });

beforeEach(() => {
    mockApi.onGet(getWeatherDataUrl).reply(200, {
        data: mockWeatherApiResponse
    })
})
  