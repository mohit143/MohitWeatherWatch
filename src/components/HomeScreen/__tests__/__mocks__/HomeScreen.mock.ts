import { WeatherData } from "@/types";
import { ForecastDay } from "@/types/WeatherData";

const currDate = new Date()
const isoDate = currDate.toISOString()
const nextDay1 = new Date()
nextDay1.setDate(currDate.getDate() + 1)
const isoDate1 = nextDay1.toISOString().split('T')[0]

const nextDay2 = new Date()
nextDay2.setDate(currDate.getDate() + 2)
const isoDate2 = nextDay2.toISOString().split('T')[0]

const nextDay3 = new Date()
nextDay3.setDate(currDate.getDate() + 3)
const isoDate3 = nextDay3.toISOString().split('T')[0]

const nextDay4 = new Date()
nextDay4.setDate(currDate.getDate() + 4)
const isoDate4 = nextDay4.toISOString().split('T')[0]

const nextDay5 = new Date()
nextDay5.setDate(currDate.getDate() + 5)
const isoDate5 = nextDay5.toISOString().split('T')[0]

const nextDay6 = new Date()
nextDay6.setDate(currDate.getDate() + 6)
const isoDate6 = nextDay6.toISOString().split('T')[0]


export const mockWeatherHomeData: WeatherData = {
    current: {
        time: isoDate,
        interval: 900,
        temperature_2m: 29.4,
        weather_code: 3,
        wind_speed_10m: 11.8,
        relative_humidity_2m: 78
    },
    daily: {
        time: [isoDate, isoDate1, isoDate2, isoDate3, isoDate4, isoDate5, isoDate6],
        sunrise: ["2024-08-18T00:41",
            "2024-08-19T00:42",
            "2024-08-20T00:42",
            "2024-08-21T00:43",
            "2024-08-22T00:43",
            "2024-08-23T00:44",
            "2024-08-24T00:44"],
        sunset: ["2024-08-18T13:41",
            "2024-08-19T13:40",
            "2024-08-20T13:39",
            "2024-08-21T13:38",
            "2024-08-22T13:37",
            "2024-08-23T13:36",
            "2024-08-24T13:35"],
        weather_code: [3, 3, 3, 3, 95, 80, 95],
        temperature_2m_max: [32.2, 33.4, 32.5, 34.1, 32.6, 30.8, 31.7],
        temperature_2m_min: [26.7, 26.9, 27.3, 27.7, 26.3, 25.9, 25.8]
    }
};

export const mockDailyWeatherData: ForecastDay[] = [

    {
        time: isoDate,
        sunrise: "2024-08-18T00:41",
        sunset: "2024-08-18T13:41",
        weather_code: 3,
        avgtemp_c: 29.45
    },

    {
        time: isoDate1,
        sunrise: "2024-08-19T00:42",
        sunset: "2024-08-19T13:40",
        weather_code: 3,
        avgtemp_c: 30.15
    },

    {
        time: isoDate2,
        sunrise: "2024-08-20T00:42",
        sunset: "2024-08-20T13:39",
        weather_code: 3,
        avgtemp_c: 29.9
    },

    {
        time: isoDate3,
        sunrise: "2024-08-21T00:43",
        sunset: "2024-08-21T13:38",
        weather_code: 3,
        avgtemp_c: 30.9
    },

    {
        time: isoDate4,
        sunrise: "2024-08-22T00:43",
        sunset: "2024-08-22T13:37",
        weather_code: 95,
        avgtemp_c: 29.45
    },

    {
        time: isoDate5,
        sunrise: "2024-08-23T00:44",
        sunset: "2024-08-23T13:36",
        weather_code: 80,
        avgtemp_c: 28.35
    },

    {
        time: isoDate6,
        sunrise: "2024-08-24T00:44",
        sunset: "2024-08-24T13:35",
        weather_code: 95,
        avgtemp_c: 28.75
    }
];
