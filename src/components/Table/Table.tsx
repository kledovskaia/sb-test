import { DetailedHTMLProps, FC, TableHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './Table.module.scss'
import { ReactComponent as ArrowIcon } from '../../assets/arrow-down.svg'
import { AppDispatch, RootState } from '../../redux/store'
import { connect } from 'react-redux'
import * as sorts from '../../helpers/sorts'
import Row from './Row'
import { setSort } from '../../redux/slices/sort'

const DEFAULT_ROWS_COUNT = 10

type Props = {
  rowsCount?: number
}

type ComponentProps = Props &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>

const orderTypes: ReadonlyArray<{
  type: Type
  label: string
}> = [
  { type: 'id', label: 'ID' },
  { type: 'title', label: 'Заголовок' },
  { type: 'body', label: 'Описание' },
]

const Table: FC<ComponentProps> = ({
  className,
  items,
  action,
  type,
  order,
  rowsCount = DEFAULT_ROWS_COUNT,
  ...props
}) => {
  return (
    <table className={cn(className, styles.table)} {...props}>
      <thead>
        <tr>
          {orderTypes.map(item => (
            <th key={item.type}>
              <button onClick={() => action({ type: item.type })}>
                <span>{item.label}</span>
                <ArrowIcon
                  className={cn({
                    [styles.order]: type === item.type,
                    [styles.order_desc]: item.type === type && order === 'desc',
                    [styles.order_asc]: item.type === type && order === 'asc',
                  })}
                />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <Row item={item} key={item.id} />
        ))}
      </tbody>
    </table>
  )
}

const mapStateToProps = ({
  posts: { value: items },
  sort: { type, order },
  page: { pageNumber: page, perPage },
}: RootState) => ({
  items: (!type || !order ? items : [...items].sort(sorts[type][order])).slice(
    (page - 1) * perPage,
    (page - 1) * perPage + perPage,
  ),
  type,
  order,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  action: ({ type, order }: Partial<InferArgType<typeof setSort>>) =>
    dispatch(
      setSort({
        type: type || null,
        order: order || null,
      }),
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
