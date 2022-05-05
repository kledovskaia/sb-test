import { DetailedHTMLProps, FC, HTMLAttributes, memo } from 'react'
import cn from 'classnames'
import styles from './Pagination.module.scss'

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Pagination: FC<Props> = ({ className, ...props }) => {
  const totalPages = 5
  const currentPage = 2

  return (
    <div className={cn(className, styles.pagination)} {...props}>
      <button className={styles.pagination__button}>Previous</button>
      <ul className={styles.pagination__pageButtons}>
        {new Array(totalPages).fill(null).map((_, i) => (
          <li key={i}>
            <button
              className={cn(styles.pagination__button, {
                [styles.pagination__button_active]: i + 1 === currentPage,
              })}
              aria-label={`Go to ${i + 1} page`}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.pagination__button}>Next</button>
    </div>
  )
}

export default memo(Pagination)
