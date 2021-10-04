import React, { FC, memo } from 'react'
import Image from 'next/image'
import { useIntl } from 'react-intl'
import Head from 'next/head'

import { IWeatherResponse } from '../../util/weather_api'
import { formatDegreesDirection } from '../../util/format/direction'
import { formatCelsius } from '../../util/format/temperature'

import styles from './CurrentWeather.module.css'
import backgroundCloudy from '../../public/cloudy.jpg'
import backgroundRainy from '../../public/rainy.jpg'
import backgroundThunderstorm from '../../public/thunderstorm.jpg'
import backgroundSnow from '../../public/snow.jpg'
import backgroundClear from '../../public/clear.jpg'
import backgroundAtmosphere from '../../public/atmosphere.jpg'

const BACKGROUNDS = {
  rain: backgroundRainy,
  clouds: backgroundCloudy,
  thunderstorm: backgroundThunderstorm,
  drizzle: backgroundRainy,
  snow: backgroundSnow,
  atmosphere: backgroundAtmosphere,
  clear: backgroundClear,
  mist: backgroundAtmosphere,
}

interface IProps {
  data: IWeatherResponse
  onSearch: () => void
}

const CurrentWeather: FC<IProps> = ({ data, onSearch }) => {
  const intl = useIntl()

  const faviconCode = data.weather?.[0]?.icon
  const conditions = data.weather?.[0]?.main?.toLowerCase() || 'clear'
  const bgUrl = BACKGROUNDS[conditions as keyof typeof BACKGROUNDS] || BACKGROUNDS['clear']

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: 'app_title' }, { place: data.name })}</title>
        <link rel="icon" href={`https://openweathermap.org/img/wn/${faviconCode}.png`} />
      </Head>

      <Image src={bgUrl} alt="Background" layout="fill" priority quality={35} />

      <div className={styles.container}>
        <div className={styles.weatherAux}>
          <small>
            {intl.formatMessage(
              { id: 'current_weather_in' },
              {
                place: (
                  <button onClick={onSearch} className={styles.activateSearch}>
                    {data.name}
                  </button>
                ),
              }
            )}
          </small>
          <small>{intl.formatDate(new Date())}</small>

          <strong>{data.weather.map((w) => w.description).join(', ')}</strong>
          <small>
            {intl.formatMessage(
              { id: 'wind' },
              {
                speed: intl.formatNumber(Math.round(data.wind.speed), { useGrouping: false }),
                direction: intl.formatMessage({ id: `dir.${formatDegreesDirection(data.wind.deg)}` }),
              }
            )}
          </small>
        </div>

        <div className={styles.weatherMain}>
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
          <div>
            <strong>{formatCelsius(intl, data.main.temp)}</strong>
            <small>
              {intl.formatMessage({ id: 'feels_like' }, { temp: formatCelsius(intl, data.main.feels_like) })}
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(CurrentWeather)
