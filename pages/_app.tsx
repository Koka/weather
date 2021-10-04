import type { AppProps } from 'next/app'
import React from 'react'
import ProgressBar from '../components/ProgressBar'

import '../styles/theme.css'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProgressBar />
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
