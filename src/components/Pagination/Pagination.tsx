import { DetailedHTMLProps, FC, HTMLAttributes, memo } from 'react'
import cn from 'classnames'
import styles from './Pagination.module.scss'
import { AppDispatch, RootState } from '../../redux/store'
import { connect } from 'react-redux'
import { nextPage, previousPage, setPage } from '../../redux/slices/page'

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Pagination: FC<Props> = ({
  pagesCount,
  pageNumber,
  nextPage,
  previousPage,
  setPage,
  className,
  ...props
}) => {
  return (
    <div className={cn(className, styles.pagination)} {...props}>
      <button onClick={previousPage} className={styles.pagination__button}>
        Previous
      </button>
      <ul className={styles.pagination__pageButtons}>
        {new Array(pagesCount).fill(null).map((_, i) => (
          <li key={i}>
            <button
              onClick={() => setPage(i + 1)}
              className={cn(styles.pagination__button, {
                [styles.pagination__button_active]: i + 1 === pageNumber,
              })}
              aria-label={`Go to ${i + 1} page`}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={nextPage} className={styles.pagination__button}>
        Next
      </button>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  pagesCount: state.page.pagesCount,
  pageNumber: state.page.pageNumber,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setPage: (page: InferArgType<typeof setPage>) => {
    dispatch(setPage(page))
  },
  nextPage: () => {
    dispatch(nextPage())
  },
  previousPage: () => {
    dispatch(previousPage())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Pagination))
