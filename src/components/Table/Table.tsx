import { DetailedHTMLProps, FC, memo, TableHTMLAttributes } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { AppDispatch, RootState } from '../../redux/store'
import { setSort } from '../../redux/actions/sort'

import * as sorts from '../../helpers/sorts'

import { ReactComponent as ArrowIcon } from '../../assets/arrow-down.svg'
import Row from './Row'

import styles from './Table.module.scss'

const ArrowIconElement = memo(ArrowIcon)

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
                <ArrowIconElement
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
        {new Array(rowsCount).fill(null).map((_, i) => (
          <Row item={items?.[i]} key={i} />
        ))}
      </tbody>
    </table>
  )
}

const mapStateToProps = ({
  posts: { value: posts },
  sort: { type, order },
  page: { pageNumber: page, perPage },
  search: { value: search },
}: RootState) => {
  let items = !type || !order ? posts : [...posts].sort(sorts[type][order])

  if (search) {
    items = items.filter(item => {
      const isTitleContain = item.title.replace(/\s+/g, ' ').includes(search)
      const isBodyContain = item.body.replace(/\s+/g, ' ').includes(search)

      return isTitleContain || isBodyContain
    })
  }
  if (page) {
    items = items.slice((page - 1) * perPage, (page - 1) * perPage + perPage)
  }

  return {
    items,
    type,
    order,
  }
}

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
