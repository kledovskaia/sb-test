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
import { setPage } from './redux/slices/page'

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const App: FC<Props> = ({
  className,
  pageNumber,
  fetchPosts,
  isLoading,
  error,
  setPage,
  ...props
}) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    const page = searchParams.get('page')
    if (page) setPage(+page)
    else setPage(1)
  }, [searchParams, setPage])

  useEffect(() => {
    if (!pageNumber) return
    navigate(`/?page=${pageNumber}`)
  }, [pageNumber, navigate])

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
  pageNumber: state.page.pageNumber,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  setPage: (page: InferArgType<typeof setPage>) => dispatch(setPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
