import { FC, memo, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'

import styles from './LocationSelector.module.css'

interface IProps {
  onCancel: () => void
}

const LocationSelector: FC<IProps> = ({ onCancel }) => {
  const intl = useIntl()

  const [str, setStr] = useState('')
  const onChange = useCallback((e) => {
    setStr(e.target.value || '')
  }, [])

  const onKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onCancel()
      }
    },
    [onCancel]
  )

  return (
    <form className={styles.container} onReset={onCancel}>
      <input
        name="q"
        type="text"
        value={str}
        onChange={onChange}
        placeholder={intl.formatMessage({ id: 'location_search.placeholder' })}
        autoFocus
        onKeyDown={onKeyDown}
      />
      <button>{intl.formatMessage({ id: 'location_search.search_button' })}</button>
    </form>
  )
}

export default memo(LocationSelector)
