import React, { FC, memo } from 'react'
import Image from 'next/image'
import { useIntl } from 'react-intl'
import Head from 'next/head'

import { IWeatherResponse } from '../../util/weather_api'
import { formatDegreesDirection } from '../../util/format/direction'
import { formatCelsius } from '../../util/format/temperature'

import styles from './CurrentWeather.module.css'

interface IProps {
  data: IWeatherResponse
}

const CurrentWeather: FC<IProps> = ({ data }) => {
  const intl = useIntl()
  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: 'app_title' }, { place: data.name })}</title>
      </Head>
      <div className={styles.container}>
        <div>
          {data.weather.map((w) => (
            <div key={w.id}>
              <Image
                src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                alt={w.description}
                width={64}
                height={64}
                layout="fixed"
                priority
              />
            </div>
          ))}
        </div>
        <div>
          <div>{intl.formatMessage({ id: 'current_weather_in' }, { place: data.name })}</div>
          <div>
            <div>{data.weather.map((w) => w.description).join(', ')}</div>
            <div>
              {formatCelsius(intl, data.main.temp)} (
              {intl.formatMessage({ id: 'feels_like' }, { temp: formatCelsius(intl, data.main.feels_like) })})
            </div>
          </div>
          <div>
            {intl.formatMessage(
              { id: 'wind' },
              {
                speed: data.wind.speed,
                direction: intl.formatMessage({ id: `dir.${formatDegreesDirection(data.wind.deg)}` }),
              }
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(CurrentWeather)
