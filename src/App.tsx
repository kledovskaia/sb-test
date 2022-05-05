import { FC, HTMLAttributes, DetailedHTMLProps, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles/App.module.scss'
import Search from './components/Search/Search'
import Pagination from './components/Pagination/Pagination'
import Table from './components/Table/Table'
import { fetchPosts } from './redux/thunks/posts'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import { setPage } from './redux/slices/page'
import { usePageRouting } from './hooks/usePageRouting'
import Loader from './components/Loader/Loader'
import Error from './components/Error/Error'

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const App: FC<Props> = ({
  className,
  pageNumber,
  fetchPosts,
  isContentShown,
  setPage,
  ...props
}) => {
  usePageRouting(pageNumber, setPage)

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className={cn(className, styles.app)} {...props}>
      <Error />
      <Loader />
      {isContentShown && (
        <>
          <Search />
          <Table />
          <Pagination className={styles.app__pagination} />
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  isContentShown:
    !!state.posts.value.length && !state.error.value && !state.loading.value,
  pageNumber: state.page.pageNumber,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  setPage: (page: InferArgType<typeof setPage>) => dispatch(setPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
