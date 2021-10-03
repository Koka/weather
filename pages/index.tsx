import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { IntlProvider } from 'react-intl'
import CurrentWeather from '../components/CurrentWeather/CurrentWeather'
import LocaleSwitcher from '../components/LocaleSwitcher/LocaleSwitcher'
import { getMessages } from '../util/i18n'

import { getCurrentWeather, IWeatherResponse } from '../util/weather_api'

import styles from '../styles/index.module.css'

interface IProps {
  data: IWeatherResponse
  defaultLocale: string
  locale: string
  locales: string[]
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ query, locale, locales, defaultLocale }) => {
  const currentLocale = (locale || defaultLocale)!

  try {
    const city = (query?.q && (Array.isArray(query.q) ? query.q[0] : query.q)) || 'Samara'
    const lang = currentLocale.substring(0, 2)

    const data = await getCurrentWeather(city, lang)

    return {
      props: {
        data,
        defaultLocale: defaultLocale!,
        locale: currentLocale,
        locales: locales || [],
      },
    }
  } catch (e) {
    console.error(e)
    return {
      notFound: true,
    }
  }
}

const Main: NextPage<IProps> = ({ data, defaultLocale, locales, locale: currentLocale }) => {
  return (
    <>
      <Head>
        <title>Simple Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.wrapper}>
        <IntlProvider
          messages={getMessages(currentLocale)}
          locale={currentLocale}
          defaultLocale={defaultLocale}
          onError={console.error}
        >
          <CurrentWeather data={data} />
        </IntlProvider>

        <LocaleSwitcher locales={locales} currentLocale={currentLocale} />
      </div>
    </>
  )
}

export default Main
