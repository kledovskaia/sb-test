import { DetailedHTMLProps, FC, HTMLAttributes, memo } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { AppDispatch, RootState } from '../../redux/store'
import { nextPage, previousPage, setPage } from '../../redux/slices/page'

import styles from './Pagination.module.scss'

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
  if (pagesCount <= 1) return null

  return (
    <div className={cn(className, styles.pagination)} {...props}>
      <button onClick={previousPage} className={styles.pagination__button}>
        Назад
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
        Далее
      </button>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  const {
    search: { value: search },
  } = state

  const items = state.posts.value.filter(item => {
    const isTitleContain = item.title.replace(/\s+/g, ' ').includes(search)
    const isBodyContain = item.body.replace(/\s+/g, ' ').includes(search)

    return isTitleContain || isBodyContain
  })

  return {
    pagesCount: !search
      ? state.page.pagesCount
      : Math.ceil(items.length / state.page.perPage),
    pageNumber: state.page.pageNumber,
  }
}

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
