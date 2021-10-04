import React, { FC, memo, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormattedMessage, IntlProvider } from 'react-intl'

import styles from './LocaleSwitcher.module.css'
import { getMessages } from '../../util/i18n'

interface IProps {
  locales: string[]
  currentLocale: string
}

const LocaleSwitcher: FC<IProps> = ({ locales, currentLocale }) => {
  const { pathname, query } = useRouter()

  const switchLanguage = useCallback((e) => {
    const locale = e.currentTarget.dataset['locale']
    document.cookie = `NEXT_LOCALE=${locale};max-age=31536000`
  }, [])

  return (
    <div className={styles.container}>
      {locales.map(
        (locale) =>
          locale !== currentLocale && (
            <Link passHref key={locale} href={{ pathname, query }} locale={locale}>
              <a data-locale={locale} className={styles.link} onClick={switchLanguage}>
                <IntlProvider locale={locale} messages={getMessages(locale)}>
                  <FormattedMessage id="lang" />
                </IntlProvider>
              </a>
            </Link>
          )
      )}
    </div>
  )
}

export default memo(LocaleSwitcher)
