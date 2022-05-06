import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  FormEvent,
  FormHTMLAttributes,
  memo,
  useCallback,
  useState,
} from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { AppDispatch } from '../../redux/store'
import { setSearch } from '../../redux/actions/search'
import { debounce } from '../../helpers/debounce'

import { ReactComponent as SearchIcon } from '../../assets/search.svg'

import styles from './Search.module.scss'

const SearchIconElement = memo(SearchIcon)

type Props = ReturnType<typeof mapDispatchToProps> &
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

const Search: FC<Props> = ({ className, handleSearch, ...props }) => {
  const [search, setSearch] = useState('')

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
      handleSearch(event.target.value)
    },
    [handleSearch],
  )

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleSearch(search)
    },
    [search, handleSearch],
  )

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(className, styles.search)}
      {...props}
    >
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
        <SearchIconElement />
      </button>
    </form>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  handleSearch: debounce((value: InferArgType<typeof setSearch>) => {
    dispatch(setSearch(value))
  }),
})

export default connect(null, mapDispatchToProps)(memo(Search))
