import Router from 'next/router'
import React, { memo, useEffect } from 'react'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

const ProgressBar = () => {
  useEffect(() => {
    function load() {
      NProgress.start()
    }

    function stop() {
      NProgress.done()
    }

    Router.events.on('routeChangeStart', load)
    Router.events.on('routeChangeComplete', stop)
    Router.events.on('routeChangeError', stop)

    return () => {
      Router.events.off('routeChangeStart', load)
      Router.events.off('routeChangeComplete', stop)
      Router.events.off('routeChangeError', stop)
    }
  })
  return null
}

export default memo(ProgressBar)
