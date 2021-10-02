import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { DeepReadonly } from 'ts-essentials'
import { getCurrentWeather, IWeatherResponse } from '../util/weather_api'

interface IProps {
  data: DeepReadonly<IWeatherResponse>
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  return {
    props: {
      data: await getCurrentWeather('Samara'),
    },
  }
}

const Main: NextPage<IProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Simple Weather App</title>
        <meta name="description" content="Playing with next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        Current weather in Samara: {data.weather.map((w) => w.description).join(', ')}; {data.main.temp} (feels like{' '}
        {data.main.feels_like})
      </div>
    </>
  )
}

export default Main
