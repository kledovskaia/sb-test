import { DetailedHTMLProps, FC, TableHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './Table.module.scss'

const DEFAULT_ROWS_COUNT = 10

type Props = {
  items: Content[]
  rowsCount?: number
} & DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>

const Table: FC<Props> = ({
  className,
  items,
  rowsCount = DEFAULT_ROWS_COUNT,
  ...props
}) => {
  return (
    <table className={cn(className, styles.table)} {...props}>
      <thead>
        <tr>
          <th>
            <button>ID</button>
          </th>
          <th>
            <button>Заголовок</button>
          </th>
          <th>
            <button>Описание</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {new Array(rowsCount).fill(null).map((_, i) => (
          <tr key={i}>
            <td>{items[i]?.id}</td>
            <td>{items[i]?.title}</td>
            <td>{items[i]?.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
