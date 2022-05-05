import { FC, HTMLAttributes, DetailedHTMLProps, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles/App.module.scss'
import Search from './components/Search/Search'
import Pagination from './components/Pagination/Pagination'
import Table from './components/Table/Table'
import { fetchPosts } from './redux/thunks/posts'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import { useNavigate, useSearchParams } from 'react-router-dom'

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const App: FC<Props> = ({
  className,
  fetchPosts,
  isLoading,
  error,
  ...props
}) => {
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className={cn(className, styles.app)} {...props}>
      <Search />
      <Table />
      <Pagination className={styles.app__pagination} />
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.posts.isLoading,
  error: state.posts.error,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
