import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  FormHTMLAttributes,
  memo,
  useCallback,
  useState,
} from 'react'
import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import cn from 'classnames'
import styles from './Search.module.scss'

type Props = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

const Search: FC<Props> = ({ className, ...props }) => {
  const [search, setSearch] = useState('')

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  return (
    <form className={cn(className, styles.search)} {...props}>
      <input
        className={styles.search__input}
        type="search"
        placeholder="Поиск"
        value={search}
        onChange={handleChange}
      />
      <button
        className={styles.search__button}
        aria-label="submit search request"
      >
        <SearchIcon />
      </button>
    </form>
  )
}

export default memo(Search)
