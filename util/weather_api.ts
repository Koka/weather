import { DeepReadonly } from 'ts-essentials'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

interface IWeatherResponseMut {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min?: number
    temp_max?: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export type IWeatherResponse = DeepReadonly<IWeatherResponseMut>

export const getCurrentWeather = async (city: string, lang: string) => {
  const url = new URL(API_URL)
  url.searchParams.append('q', city)
  url.searchParams.append('units', 'metric')
  url.searchParams.append('lang', lang)
  url.searchParams.append('appid', process.env.OPENWEATHERMAP_API_KEY || '')

  const rs = await fetch(url.toString())

  const json = await rs.json()

  if (json.cod !== 200) {
    throw new Error(json.message || 'Error loading weather data')
  }

  return json as IWeatherResponse
}
